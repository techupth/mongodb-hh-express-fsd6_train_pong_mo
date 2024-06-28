import { Router } from "express";
import { db } from "../utils/db";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");

  return res.json({
    data: "[<Product object หลายๆ อันจะอยู่ใน Array นี้>]",
  });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);
  const newProductdata = { ...req.body };

  await collection.findOne({
    _id: productId,
  });
  return res.json({
    message: "recive products",
  });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");

  const porductData = { ...req.body };
  const products = await collection.insertOne(porductData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);
  const newProductdata = { ...req.body };

  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: newProductdata,
    }
  );
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);

  await collection.deleteOne({
    _id: productId,
  });
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
