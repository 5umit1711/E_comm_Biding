import mongoose, { mongo } from "mongoose";

const bidSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    bidAmount: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Bids = mongoose.model('bids', bidSchema);

export default Bids;