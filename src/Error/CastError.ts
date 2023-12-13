import mongoose from "mongoose";

const handleCastError = (err: mongoose.Error.CastError) => {
    const statusCode = 400
    let errorMessage: string = err.message
    return {
        statusCode,
        errorMessage
    }
}
export default handleCastError