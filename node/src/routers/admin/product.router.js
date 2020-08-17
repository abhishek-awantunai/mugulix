const express = require("express");
const router = express.Router();
const Product = require("./../../models/admin/product");
const auth = require("./../../middlewares/auth");
const Category = require("./../../models/admin/category");

router.post("/add", auth, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      created_by: req.user.id,
    });

    if (!product) {
      throw new Error("Something went wrong!!");
    }

    res.send({ status: true, data: product });
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).send({
        status: false,
        message: "Can't add this product as this product already exists",
      });
    }
    res.status(400).send({ status: false, message: err.message });
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const products = await Product.find(req.query);
    if (!products) {
      throw new Error("Something went wrong!!");
    }

    const product_list = JSON.parse(JSON.stringify(products));

    if (product_list.length > 0) {
      const cateogries = await Category.find();
      product_list.forEach((product, index) => {
        const category_index = cateogries.findIndex(
          (cat) => cat.id === product.category
        );
        if (category_index > -1) {
          const category = cateogries[category_index];
          product.category = category.category_name;
          product.categoryId = category_index;
          if (category.subcategory_list.length > 0) {
            const subcategory = category.subcategory_list.find(
              (subcat) => subcat._id == product.sub_category
            );
            product.sub_category = subcategory.subcategory;
            product.sub_categoryId = subcategory.id;
          }
        }
      });
    }

    res.send({ status: true, data: product_list });
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
});

router.post("/delete", auth, async (req, res) => {
  try {
    const _id = req.body.id;
    if (!_id) {
      throw new Error("id is required");
    }

    const del = await Product.deleteOne({ _id });

    if (del && del.deletedCount > 0) {
      res.send({ status: true, data: "product deleted successfully" });
    } else {
      throw new Error("Product does not exist");
    }
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const _id = req.body.id;

    if (!_id) {
      throw new Error("id is required");
    }

    if (Object.keys(req.body).length < 2) {
      throw new Error("At least one field is required to update");
    }

    const product = await Product.findOne({ _id });

    if (!product) {
      throw new Error("Product does not exist");
    }

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        product[key] = req.body[key];
      }
    }
    product.save();

    res.send({ status: true, data: product });
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
});

module.exports = router;
