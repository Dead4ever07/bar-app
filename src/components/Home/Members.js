function importAll(r) {
  return r.keys().map((file) => {
    // get filename only (e.g. "./alex-costa.jpg" → "alex-costa")
    const filename = file.replace("./", "").replace(/\.(png|jpe?g|svg)$/, "");

    // turn filename into a readable name ("alex-costa" → "Alex Costa")
    const name = filename
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      name,
      role: "", // default role (you can customize later)
      photo: r(file),
    };
  });
}

// Load all images in resources/team/ (non-recursive)
const members = importAll(
  require.context("../../resources/team", false, /\.(png|jpe?g|svg)$/)
);

export default members;