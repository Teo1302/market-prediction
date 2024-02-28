const express = require('express')
const app = express()
const port = process.env.PORT || 6001
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
console.log(process.env.DB_USER)



//middleware
app.use(cors());
app.use(express.json());

//MONGO DB CONFIG USING MONGOOSE
//teodoraradu36
//fLlmGqiyynfJtssj

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.ackmzek.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
    .then(
        console.log("MongoDB Connected Successfully!")
    )
    .catch((error) => console.log("Error connecting to MongoDB", error));

//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
//app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})