import mongoose from "mongoose";

function connectDB( url )  {
    mongoose.connect(url).then(
        console.log("MONGODB CONNECTED!")
    );
}

export default connectDB