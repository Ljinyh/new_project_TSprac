"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));

const app = (0, express_1.default)();

app.get("/", (req, res, next) => {
  res.send("Backend server, Hello there!");
});

const port = 8080;

app.listen(port, () => {
  console.log(`
    =======================================
        🥰   {port} server running!   🥰
    =======================================
    `);
});
