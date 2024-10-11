import Bids from "../models/bidModel.js";
import express from "express";
import authorization from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/placeNewBid", authorization, async (req, res) => {
  try {
    const newBid = new Bids(req.body);
    newBid.save();
    res.send({
      success: true,
      message: "Bid placed successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/getAllBids", async (req, res) => {
  try {
    const { product, seller, buyer } = req.body;
    const filter = {};
    if (product) {
      filter.product = product;
    }
    if (seller) {
      filter.seller = seller;
    }
    if(buyer){
      filter.buyer = buyer;
    }

    const bids = await Bids.find(filter)
      .populate("seller")
      .populate("buyer")
      .populate("product");

    res.send({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
