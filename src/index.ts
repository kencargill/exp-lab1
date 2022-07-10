import express from "express";
import cors from "cors";
import itemRouter from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cart-items", itemRouter)

const port = 3002;
app.listen(port, () => console.log(`listening on port: http://localhost:${port}`));