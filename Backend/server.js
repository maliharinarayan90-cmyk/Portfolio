const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// MONGODB CONNECTION
// =====================================================

// Abhi database name change mat karo.
// Existing Contact / Todo / Product data safe rahega.
mongoose
    .connect("mongodb://127.0.0.1:27017/loginDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// =====================================================
// CONTACT
// =====================================================

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);


// =====================================================
// CONTACT API
// =====================================================

app.post("/api/contact", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            message,
        } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newContact = new Contact({
            name,
            email,
            phone,
            message,
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully",
        });

    } catch (error) {
        console.log("Contact Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save message",
        });
    }
});


// =====================================================
// TODO
// =====================================================

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model("Todo", todoSchema);


// =====================================================
// GET ALL TODOS
// =====================================================

app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({
            createdAt: -1,
        });

        res.json(todos);

    } catch (error) {
        console.log("Get Todo Error:", error);

        res.status(500).json({
            message: "Failed to get todos",
        });
    }
});


// =====================================================
// ADD TODO
// =====================================================

app.post("/api/todos", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Todo title is required",
            });
        }

        const newTodo = new Todo({
            title: title.trim(),
        });

        await newTodo.save();

        res.status(201).json(newTodo);

    } catch (error) {
        console.log("Add Todo Error:", error);

        res.status(500).json({
            message: "Failed to add todo",
        });
    }
});


// =====================================================
// UPDATE TODO
// =====================================================

app.put("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            completed,
        } = req.body;

        const updatedTodo =
            await Todo.findByIdAndUpdate(
                id,
                {
                    title,
                    completed,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.json(updatedTodo);

    } catch (error) {
        console.log("Update Todo Error:", error);

        res.status(500).json({
            message: "Failed to update todo",
        });
    }
});


// =====================================================
// DELETE TODO
// =====================================================

app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo =
            await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.json({
            success: true,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.log("Delete Todo Error:", error);

        res.status(500).json({
            message: "Failed to delete todo",
        });
    }
});


// =====================================================
// E-COMMERCE PRODUCTS
// =====================================================


// =====================================================
// GET ALL PRODUCTS
// =====================================================

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1,
        });

        res.json(products);

    } catch (error) {
        console.log("Get Products Error:", error);

        res.status(500).json({
            message: "Failed to get products",
        });
    }
});


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

app.get("/api/products/:id", async (req, res) => {
    try {
        const product =
            await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);

    } catch (error) {
        console.log("Get Product Error:", error);

        res.status(500).json({
            message: "Failed to get product",
        });
    }
});


// =====================================================
// ADD PRODUCT
// =====================================================

app.post("/api/products", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image,
            stock,
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category ||
            !image
        ) {
            return res.status(400).json({
                message: "All required fields are needed",
            });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
            stock: stock || 0,
        });

        await newProduct.save();

        res.status(201).json(newProduct);

    } catch (error) {
        console.log("Add Product Error:", error);

        res.status(500).json({
            message: "Failed to add product",
        });
    }
});


// =====================================================
// DELETE PRODUCT
// =====================================================

app.delete("/api/products/:id", async (req, res) => {
    try {
        const deletedProduct =
            await Product.findByIdAndDelete(
                req.params.id
            );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.log("Delete Product Error:", error);

        res.status(500).json({
            message: "Failed to delete product",
        });
    }
});


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Server is running",
    });
});


// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
    });
});


// =====================================================
// START SERVER
// =====================================================

app.listen(5000, () => {
    console.log(
        "Server running on http://localhost:5000"
    );
});