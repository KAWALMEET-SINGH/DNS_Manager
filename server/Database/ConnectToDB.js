import mongoose from 'mongoose'


export  const connectToDB = async()=>{
        try {
            await mongoose.connect(process.env.DBURI)
            console.log("DB connected");
        } catch (error) {
            console.log(error);
        
        } 
        
}