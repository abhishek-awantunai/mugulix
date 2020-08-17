const express = require("express");
const router = express.Router();
const auth = require("./../../middlewares/auth");
const Product = require("./../../models/admin/product");
const Category = require("./../../models/admin/category");
const Home = require("./../../models/moglix/home.model");

router.get("/get-product-list", auth, async (req, res) => {
  try {
    const home = await Home.find();
    let category_list = home[0]["categoryList"].filter((item, pos) => {
      return home[0]["categoryList"].indexOf(item) == pos;
    });

    let carausal_data = JSON.parse(JSON.stringify(home[0]));
    let cdata = {};
    cdata.flyer = [];
    cdata.advertisement = [];
    cdata.coupon = carausal_data.coupon;
    for (let i = 1; i < 6; i++) {
      const obj = {
        img_url: carausal_data["image" + i],
        caption: carausal_data["caption" + i],
      };
      cdata.flyer.push(obj);
    }

    for (let i = 1; i < 4; i++) {
      const obj = {
        img_url: carausal_data["advImg" + i],
      };
      cdata.advertisement.push(obj);
    }

    if (
      !(category_list && category_list.length > 0 && category_list.length < 9)
    ) {
      throw new Error("Need atleas one category to fetch products");
    }

    $or = [];
    category_list.forEach((category) => {
      $or.push({ category });
    });

    const cateogries = await Category.find();
    let products = await Product.find({ $or });

    const product_array = [];

    category_list.forEach((category) => {
      const data = {};
      const current_category = cateogries.find(
        (categ) => categ.id === category
      );
      data["name"] = current_category["category_name"];
      data["id"] = current_category["id"];
      data["products"] = products.filter(
        (product) => product.category === category
      );
      data["products"].forEach((product) => {
        product.category = data["name"];
        product.sub_category = current_category.subcategory_list.find(
          (sub) => sub.id === product.sub_category
        )["subcategory"];
      });
      product_array.push(data);
    });

    res.status(200).send({
      status: true,
      data: { banner_data: cdata, category_data: product_array },
    });
  } catch (err) {
    res.status(400).send({ status: false, error: err.message });
  }
});

router.post("/update-home-data", auth, async (req, res) => {
  try {
    if (
      !req.body.categoryList ||
      req.body.categoryList.length === 0 ||
      req.body.categoryList.length > 8
    ) {
      throw new Error("Category list can't be blank or greater than 8");
    }

    const home = await Home.find();

    if (!home) {
      throw new Error("Home data does not exists");
    }

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        home[0][key] = req.body[key];
      }
    }
    home[0].save();

    res.send({ status: true, data: home[0] });
  } catch (err) {
    res.status(400).send({ status: false, error: err.message });
  }
});

module.exports = router;
