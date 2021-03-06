import mongoose from "mongoose"
import { stockInTypes } from "../utils/enum.js"

const StockInSchema = mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    type: {
        type: Number,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
        required: function() {
            return this.type == stockInTypes.PURCHASE;
        }
    },
    transaction_no: {
        type: String,
        unique: true,
        sparse: true,
        required: function() {
            return this.type == stockInTypes.PURCHASE;
        },
    },
    sale_return: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stock_out",
        required: function() {
            return this.type == stockInTypes.RETURN;
        },
    },
    attachments: {
        type: Array,
        default: []
    },
    remarks: {
        type: String,
        required: function() {
            return this.type != stockInTypes.PURCHASE;
        },
    },
    date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    },
    total_qty: {
        type: Number,
        required: true
    },
},
{
    versionKey: false
})

export default mongoose.model("stock_in", StockInSchema);