const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        cardItem: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
