import "dotenv/config";

export default {
  env: process.env.NODE_ENV || "localhost",
  port: process.env.PORT || 3000,
  log: {
    name: process.env.APP_NAME || "4pl-fleet-api",
    streams: [
      {
        type: "stream",
        stream: process.stdout,
        level: "debug",
      },
    ],
  },
};
