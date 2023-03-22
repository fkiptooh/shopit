const app = require('./app');
const connectDB = require('./config/database')

// setting up config 
require('dotenv').config({ path: './config/config.env'})

// connecting database
connectDB();


app.listen(process.env.PORT, ()=> {
    console.log(`Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})