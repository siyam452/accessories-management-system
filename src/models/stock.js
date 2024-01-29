import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    size: String,
    stockCount: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Stock = mongoose.models.Items || mongoose.model("Items", StockSchema);

export default Stock;
