import { useEffect, useState } from "react";
import { fetchPortfolio } from "./api/portfolio";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch(() => setError("Could not load portfolio data. Is the backend running?"));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="glass rounded-xl p-8 max-w-md text-center border border-red-500/20">
          <p className="text-red-400 font-mono text-sm">{error}</p>
          <p className="text-slate-500 text-xs mt-2">Run: <code className="text-neon-green">python backend/main.py</code></p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-neon-green/30 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border-2 border-t-neon-green border-transparent animate-spin" />
          </div>
          <p className="text-slate-500 font-mono text-sm tracking-widest">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar name={data.personal.name} />
      <Hero data={data} />
      <Summary summary={data.summary} personal={data.personal} />
      <Experience experience={data.experience} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Certifications certifications={data.certifications} />
      <Footer personal={data.personal} />
    </div>
  );
}
