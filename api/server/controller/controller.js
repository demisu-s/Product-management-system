const Userdb = require('../model/model');

// Create product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    const product = new Userdb({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status,
    });
    // Save in the database
    product
        .save()
        .then((data) => {
            res.redirect("/");
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product",
            });
        });
};

// Retrieve product or return the product
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: "Not found product with id " + id,
                    });
                } else {
                    res.send(data);
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error while retrieving Product with id " + id,
                });
            });
    } else {
        Userdb.find()
            .then((product) => {
                res.send(product);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Error occurred while retrieving product from the database",
                });
            });
    }
};

// Update the product by using ID
exports.update = (req, res) => {
    // Product update validation
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update product with ID ${id}. Maybe the product is not found.`,
                });
            } else {
                return res.send(data);
            }
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error updating product information",
            });
        });
};

// Delete product by using ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete product with id ${id}. Maybe the product with this id is not found!`,
                });
            } else {
                res.send({
                    message: "Product was deleted successfully",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete user with id" + id,
            });
        });
};
