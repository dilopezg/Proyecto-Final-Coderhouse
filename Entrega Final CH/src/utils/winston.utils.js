import winston from "winston";

const winLog = new winston.createLogger({
  format: winston.format.combine(winston.format.json()),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      name: "warnFile",
      filename: "./logs/warning.log",
      level: "info",
      levelOnly: true,
    }),
    new winston.transports.File({
      name: "errorFile",
      filename: "./logs/errors.log",
      level: "error",
      levelOnly: true,
    }),
  ],
});

export default winLog;
