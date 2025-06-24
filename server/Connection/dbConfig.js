import mongoose from "mongoose"


export const connectDb = async () => {
    // console
    mongoose.connect(process.env.MONGO_URL)
        .then((data) => {
        console.log("DB CONNECTED")
        })
        .catch((error) => {
        console.log("DB CONNECTION FAILED : " , error.message)
    })
}