import dotenv from "dotenv"
import connectDB from "./src/db.js"
import { app } from "./app.js"


dotenv.config({
    path: "/.sample.env"
})

const port = process.sample.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(port)
        console.log(`\nServer is running at http://localhost:${port}`);

    })
    .catch((error)=>{
        console.log(`mongo_db faild to connect in index.js ${error}`);
        process.exit(1)
    })
