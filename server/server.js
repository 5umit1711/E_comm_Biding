import express from 'express';
import dotenv from 'dotenv';
import connect from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import bidRoutes from "./routes/bidRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello Sumit");
});

app.use('/api/users', userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/bids', bidRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
}

app.listen(PORT, () => {
    connect();
    console.log("Server started successfully on port", PORT);
});
