const express = require('express')
const app = express()
const port = process.env.PORT || 6001
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cors = require('cors')

// secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());


//MONGODB CONFIG USING MONGOOSE
//teodoraradu36
//fLlmGqiyynfJtssj

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.ackmzek.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
    .then(
        console.log("MongoDB Connected Successfully!")
    )
    .catch((error) => console.log("Error connecting to MongoDB", error));

//jwt autentif

app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24hr'
    });
    res.send({ token });
});


// rutele
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes = require("./api/routes/paymentRoutes");
const reservationRoutes = require('./api/routes/reservationRoutes');
const favoriteRoutes = require('./api/routes/favoriteRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const clientMessagesRoutes = require('./api/routes/clientMessagesRoutes');
const verifyToken = require('./api/middleware/verifyToken')
//const adminStats =  require('./api/routes/adminStats');
//const orderStats = require('./api/routes/orderStats');



app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use("/payments", paymentRoutes);
app.use('/rezervare', reservationRoutes);
app.use('/vizualizare-rezervari', reservationRoutes);
app.use('/rezervare-client', reservationRoutes);
app.use('/favorite',favoriteRoutes);
app.use('/orders', orderRoutes);
app.use('/messages',clientMessagesRoutes);


//app.use('/admin-stats', adminStats);
//app.use('/order-stats', orderStats);


app.post("/create-payment-intent",verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price*100;
  // console.log(amount);

  // Creaza un paymentintent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});