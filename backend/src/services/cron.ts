import cron from "node-cron";
import axios from "axios";

const pingServer = async () => {
  try {
    await axios.get("https://fletnix-f1b9.onrender.com/ping");
    console.log("[ping]: response from server:");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

export const handleStartCron = () => {
  cron.schedule("*/10 * * * *", () => {
    console.log("[cron]: sending ping request to the server...");
    pingServer();
    console.log("[cron]: ping Request Done");
  });
};
