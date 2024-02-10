const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cardRouter = require("./routes/card");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// Kök yolu için rota tanımla
app.get("/", (req, res) => {
  res.send("Merhaba, Express uygulamama hoş geldiniz!");
});

app.use("/api/products", productRouter);
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);
app.use("/api/orders", orderRouter);
app.use("/api/review", reviewRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Uygulama port ${process.env.PORT || port} üzerinde dinleniyor.`)
);
