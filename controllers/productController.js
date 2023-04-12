import Product from "../models/productSchema.js";

//create product
export const createProduct= async(req,res)=>{
    const {name,price} = req.body;
    if(!name || !price){
        res.status(400).json({
            sucess:false,
            message:"Both name and price are required"
        })
        return;
    }
    const product = new Product({
        name:name,
        price:price
    });
    await product.save();
    res.status(201).json({
        sucess:true,
        message:" object is saved"
    })
    return;
}