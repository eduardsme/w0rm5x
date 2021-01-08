import mongoose from "mongoose"

const StockInSchema = mongoose.Schema({
    type: {
        type: Number,
        required: true
    },
    attachments: {
        type: Array,
        default: []
    },
    remarks: {
        type: String,
        default: ''
    }
},
{
    versionKey: false
})

export default mongoose.model("stock_in", StockInSchema)