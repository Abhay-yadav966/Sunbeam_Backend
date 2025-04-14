const pool = require("../config/database");


const validCategory = (category_id) => {
    return new Promise((resolve, reject) => {
        const sql = "select * from categories where id=?";
        pool.query(sql, [category_id], (err, data) => {
            if (data.length > 0) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        })
    })
}

exports.createBlog = async (req, res) => {
    try {
        const { title, contents, category_id } = req.body;
        
        if(!title || !contents || !user_id || category_id){
            return res.status(403).json({
                success: false,
                message: "Please fill all details carefully",
            });
        }

        const checkCategory = await validCategory(category_id);
        if (!checkCategory) {
            return res.status(404).json({
                success: false,
                message: " Category not Found",
            });
        }

        const sql = "insert into blogs (title, contents, user_id, category_id) VALUES (?, ?, ?, ?)";
        pool.query(sql, [title, contents, req.user.id, category_id], (err, data) => {
            if (data) {
                if (data) {
                    res.status(200).json({
                        success: true,
                        message: "Blog Created Successfully",
                    });
                }
                else if (err) {
                    throw new Error(err);
                }
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Could not create blog",
        }); 
    }
}

const getBlogData = () => {
    return new Promise((resolve, reject) => {
        const sql = "select * from blogs where id=?";
        pool.query(sql, [id], (error, data) => {
            if (data.length > 0) {
                return resolve(data[0]);
            }
            else {
                return resolve(false);
            }
        })
    })
}

exports.editBlog = async (req, res) => {
    try {
        const { id, title, contents, category_id } = req.body;
        
        const blogDetails = getBlogData(id);

        if (!blogDetails) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (title != undefined) {
            blogDetails.title = title;  
        }
        
        if (contents != undefined) {
            blogDetails.contents = contents;  
        }

        if (category_id != undefined) {
            blogDetails.category_id = category_id;  
        }

        const sql2 = "UPDATE blogs SET title=?, contents=?, category_id=?, user_id=? where id=?";
        pool.query(sql2, [blogDetails.title, blogDetails.contents, blogDetails.category_id, req.user.id, id], (err, data) => {
            if (data) {
                return res.status(200).json({
                    success: true,
                    message: "Blog edited successfully",
                    data
                })
            } else if(err) {
                throw new Error(err);
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Could not edit blog",
        });    
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const sql = "select * from blogs";
        pool.query(sql, (err, data) => {
            if (data) {
                return res.status(200), json({
                    success: true,
                    message: "blogs get successfully",
                    data:data,
                })
            } else if(err){
                throw new Error(err);
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured at getting blogs",
            error: err.message, 
        });
    }
}

exports.myBlogs = async (req, res) => {
    try {
        const sql = "select * from blogs where user_id=?";
        pool.query(sql, [req.user.id], (err, data) => {
            if (data) {
                return res.status(200), json({
                    success: true,
                    message: "Personal blogs get successfully",
                    data:data,
                }) 
            } else if (err) {
                throw new Error(err);
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occured at getting personal blogs",
            error: err.message, 
        });
    }
}

