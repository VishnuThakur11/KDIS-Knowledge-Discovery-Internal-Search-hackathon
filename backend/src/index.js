import app from "../api/index.js";

const PORT = 5001;
app.listen(PORT, () => console.log("local server running on " + PORT));