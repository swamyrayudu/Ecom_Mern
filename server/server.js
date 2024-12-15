const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-router');
const adminproductRouter = require('./routes/admin/products-routes')
const shoppingproductRouter = require('./routes/shop/products-routes')

const app = express();


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products',adminproductRouter)
app.use('/api/shopping/products',shoppingproductRouter)


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecomers')
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log(err);
    });
 
    


app.listen(9001, () => {
    console.log('Server running on port 9001');
});
