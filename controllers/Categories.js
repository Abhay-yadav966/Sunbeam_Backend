
const pool = require("../config/database");

const validCategory = (title) => {
    return new Promise((resolve, reject) => {
        const sql = "select * from categories where title=?";
        pool.query(sql, [title], (err, data) => {
            if (data.length > 0) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        })
    })
}

exports.addCategory = async (req, res) => {
    try {   
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(404).json({
                success: false,
                message:"Please fill all details carefully",
            });
        }

        const checkCategory = await validCategory(title);
        
        if (checkCategory) {
            return res.status(200).json({
                success: false,
                message:"Category already exists",
            })
        }

        const sql = "insert into categories (title, description) values (?, ?)";
        pool.query(sql, [title, description], (error, data) => {
            if (data) { 
                return res.status(200).json({
                    success: true,
                    message: "Category created successfully",
                    data:data,
                })                
            } else if(error) {
                throw new Error(error);
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured in adding category",
            error: err.message,
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        console.log("reached");
        const sql = "select * from categories";
        pool.query(sql, (error, data) => {
            if (data) {
                return res.status(200).json({
                    success: true,
                    message: "Categories get successfully",
                    data:data,
                })
            }
            else if (error) {
                throw new Error(error);    
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured at getting categories",
            error: err.message,
        });
    }
}