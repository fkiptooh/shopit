const ErrorHandler = require('../util/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   
    if (process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack    
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err};
        // console.log(err)

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invald: ${err.path}`
            err = new ErrorHandler(message, 400)
        }

        // Handling Mongoose validation error
        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value=> value.message);
            err = new ErrorHandler(message, 400)
        }

        // Handling mongoose duplicate keys
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            err = new ErrorHandler(message, 400)
        }
        // Json webtoken err
        if (err.name === 'JsonWebTokenError'){
            const message = "Json web token is invalid. Try again!!";
            err = new ErrorHandler(message, 400)
        }

        // Token has expired
        if (err.name === 'TokenExpiredError'){
            const message = "Json web token has expired!";
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: err.message || 'Internal server error'
        })
    }
}