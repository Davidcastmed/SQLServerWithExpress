// server.js
import express from "express";
import cors from 'cors';
import itemRouter from "../routes/itemRoutes.js";
import userRouter from "../routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors());

//  Sample route
app.use('/api', itemRouter);
app.use('/api', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});