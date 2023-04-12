import mongoose from 'mongoose';

const productSchema=new mongoose.Schema(
    {
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;