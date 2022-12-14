const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => res.status(200).json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagInput) => res.json(tagInput))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((tagInput) => {
      if (!tagInput) {
        res.status(404).json({ message: "Tag not found" });
      }
      res.json(tagInput);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDeleteResponse) => res.json(dbDeleteResponse))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
