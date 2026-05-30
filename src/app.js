const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//Middleware
const loggerMiddleware = require('./middleware/loggerMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(loggerMiddleware);
app.use(authMiddleware);
app.use(errorMiddleware);

//Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

//Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('EasyMart API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});