import express from "express"
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from "./routes/users.js"
// generate version of api
const app = express()

//middleware

//convert data from front end into json
app.use(express.json())

app.use(cors())
app.use("/auth", userRouter)
mongoose.connect("mongodb+srv://jaca00:Atlas123@recipes.jbn09ki.mongodb.net/recipes?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.listen(3000, () => console.log("server running"))