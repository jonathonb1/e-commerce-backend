const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  }).then((dbCategoryData) => res.status(200).json(dbCategoryData)).cat;
});

router.get("/:id", (req, res) => {
  Category.findOne({
    include: [
      {
        model: Product,
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbcategoryData) => res.status(200).json(dbcategoryData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryInput) => {
      if (!dbCategoryInput) {
        res.status(404).json({ message: "Category not found" });
      }
      res.json(dbcategoryInput);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRemoveResonse) => res.json(dbRemoveResonse))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
