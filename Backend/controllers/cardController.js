const Product = require("../models/Products");
const Card = require("../models/Card");

module.exports = {
  addToCard: async (req, res) => {
    const userId = req.user.id;
    const { cardItem, quantity } = req.body;

    try {
      const card = await Card.find({ userId });

      if (card) {
        const existingProduct = card.products.find(
          (product) =>
            product.cardItem &&
            product.cardItem.toString() === cardItem.toString()
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          card.products.push({ cardItem, quantity });
        }

        await card.save();
        res.status(200).json({ message: "Product added to cart", card });
      } else {
        const newCard = new Card({
          userId,
          products: [{ cardItem, quantity }],
        });

        await newCard.save();
        res
          .status(200)
          .json({ message: "Product added to cart", card: newCard });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCard: async (req, res) => {
    const userId = req.params.id;

    try {
      const card = await Card.find({ userId: userId }).populate(
        `products.cardItem`, // "cartItem" düzeltilerek "cardItem" olarak değiştirildi
        "_id title supplier price imageUrl"
      );
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCardItem: async (req, res) => {
    const cardItemId = req.params.cartItemId;

    try {
      const updatedCard = await Card.findOneAndUpdate(
        { "products._id": cardItemId },
        { $pull: { products: { _id: cardItemId } } },
        { new: true }
      );
      if (!updatedCard) {
        return res.status(404).json("Cart item not found");
      }
      res.status(200).json(updatedCard);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  decrementCardItem: async (req, res) => {
    const { userId, cardItem } = req.body;

    try {
      const card = await Card.findOne({ userId }); // "const" eklendi
      if (!card) {
        return res.status(404).json("Card not found");
      }
      const existingProduct = card.products.find(
        (product) => product.cardItem.toString() === cardItem.toString()
      );
      if (!existingProduct) {
        return res.status(404).json("Product not found");
      }
      if (existingProduct.quantity === 1) {
        card.products = card.products.filter(
          (product) => product.cardItem.toString() !== cardItem.toString()
        );
      } else {
        existingProduct.quantity -= 1;
      }
      await card.save();
      if (existingProduct.quantity === 0) {
        await Card.updateOne({ userId }, { $pull: { products: { cardItem } } });
      }

      res.status(200).json("Product updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
