const app = require('./app');
const connectDB = require('./config/database')

// Handling the Uncaught Exception
process.on('uncaughtException', err=> {
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting down the server due to uncaughtExeption`)
    process.exit(1);
})

// setting up config 
require('dotenv').config({ path: './config/config.env'})

// connecting database
connectDB();

// example of the uncaught exception
// console.log(a)


const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handling the Unhandled promise rejection error
process.on('unhandledRejection', err=> {
    console.log(`ERROR: ${err.message}`)
    console.log(`Shutting down the server due to unhadled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})