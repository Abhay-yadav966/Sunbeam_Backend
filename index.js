const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = 4000;

// middleware 
app.use(express.json());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
);

// initiate the server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message:"Your Server is up and Running...."
    })
})