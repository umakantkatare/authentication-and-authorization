import app from "./src/app.js";
import dbConnected from "./src/config/db.config.js";

const PORT = process.env.PORT || 5000;

async function serverStart() {
  try {
    await dbConnected();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

serverStart();
