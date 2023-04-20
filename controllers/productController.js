import Product from "../models/productSchema.js";

//create product--admin
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
// Get all products
export const getAllProducts=async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({
        sucess:true,
        products
    })
}

//update product -- admin
export const updateProduct=async(req,res,next)=>{
    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            message:"Prodct not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        sucess:true,
        product
    })
}

//delete product
export const deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            message:"Prodct not found"
        })
    }
    await product.remove();
    res.status(200).json({
        sucess:true,
        message:"product deleted sucessfully"
    })
}