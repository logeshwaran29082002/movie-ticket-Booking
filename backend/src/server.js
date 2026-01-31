// Load .env only in development (not in Render production)
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});