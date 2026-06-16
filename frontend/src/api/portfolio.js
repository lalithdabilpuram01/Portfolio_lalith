export const fetchPortfolio = () =>
  fetch("/portfolio.json").then((r) => {
    if (!r.ok) throw new Error("Failed to load portfolio.json");
    return r.json();
  });
