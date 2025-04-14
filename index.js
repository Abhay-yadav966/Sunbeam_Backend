const express = require("express");
const app = express();

const userRoute = require("./routes/User");
const categoryRoute = require("./routes/Categories");
const blogRoute = require("./routes/Blog");

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware 
app.use(express.json());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
);

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/blog", blogRoute);


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