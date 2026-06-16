from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import json
import shutil
import uuid

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
# Single source of truth — live in frontend/public so Netlify picks it up
DATA_FILE = BASE_DIR.parent / "frontend" / "public" / "portfolio.json"
STATIC_DIR = BASE_DIR / "static"
STATIC_DIR.mkdir(exist_ok=True)


@app.get("/api/portfolio")
async def get_portfolio():
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="portfolio.json not found in backend/data/")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Invalid JSON: {e}")


@app.post("/api/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    allowed = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
    ext = Path(file.filename).suffix.lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")

    filename = f"photo_{uuid.uuid4().hex[:8]}{ext}"
    dest = STATIC_DIR / filename
    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    # Auto-update portfolio.json so the photo shows immediately after reload
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    data["personal"]["photo"] = filename
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

    return {"photo": filename, "url": f"/static/{filename}"}


@app.delete("/api/remove-photo")
async def remove_photo():
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    old = data["personal"].get("photo")
    if old:
        old_path = STATIC_DIR / old
        if old_path.exists():
            old_path.unlink()
    data["personal"]["photo"] = None
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    return {"status": "removed"}


@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    allowed = {".pdf", ".doc", ".docx"}
    ext = Path(file.filename).suffix.lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"Only PDF, DOC, DOCX allowed. Got {ext}")

    # Always save as resume.pdf (or .docx) so the JSON filename stays stable
    filename = f"resume{ext}"
    dest = BASE_DIR.parent / "frontend" / "public" / filename
    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    # Update portfolio.json with filename
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    if "resume" not in data["personal"]:
        data["personal"]["resume"] = {"visible": False}
    data["personal"]["resume"]["filename"] = filename
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

    return {"filename": filename}


@app.patch("/api/resume-visibility")
async def set_resume_visibility(visible: bool):
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    if "resume" not in data["personal"]:
        data["personal"]["resume"] = {"filename": None}
    data["personal"]["resume"]["visible"] = visible
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    return {"visible": visible}


@app.get("/health")
async def health():
    return {"status": "ok"}


app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
