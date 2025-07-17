import mongoose from 'mongoose';

import products from './data/products.js';
import Product from './models/productModel.js';

const importProducts = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nezzyan1984:U0ZYpGYggddOmwwr@cluster0.dxc5urd.mongodb.net/NJ-shopit?retryWrites=true&w=majority&appName=Cluster0'
    );

    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('Products are added');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

importProducts();
