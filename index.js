import express from "express";
import mongoose from "mongoose"
import "dotenv/config";

import { login } from "./controllers/user.js";
import { verifyToken, checkIfAdmin } from "./middlewares/auth.js";
import { logRequests } from "./middlewares/logs.js";
import category from "./routers/category.js";
import product from "./routers/product.js";
import user from "./routers/user.js";

const app = express();
const port = process.env.PORT || process.env.API_PORT;
const dbConString = process.env.DB;

// const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true, }

mongoose.connect(dbConString, (err) => {
    if (err) {
        console.log("mongoose connection error: ", err);
        return
    }

    app.use(express.json());

    // app.get('/', verifyToken, checkIfAdmin, (req, res) => { //testing
    //     res.status(200).json({ message: 'Hello world' })
    // })

    app.post("/login", logRequests, login)
    app.use("/user", verifyToken, logRequests, user)
    app.use("/category", verifyToken, checkIfAdmin, category)
    app.use("/product", verifyToken, product)
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    })
})

