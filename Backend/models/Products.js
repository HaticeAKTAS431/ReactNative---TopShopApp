const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  supplier: { type: String, required: true },
  price: { type: String, required: true }, // price alanı eklendi
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  product_location: { type: String, required: true }, // product_location alanı da eklenebilir
},{timestamps:true} );

module.exports = mongoose.model("Product", productSchema);
