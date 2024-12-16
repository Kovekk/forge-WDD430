var express = require('express');
var router = express.Router();

const MagicItem = require('../models/magic-item');

// place routes here

// Get all magic items
router.get("/", (req, res, next) => {
  MagicItem.find()
    .then(magicItems => {
      res.status(200).json(magicItems);
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while GETTING magic items",
        error: err
      })
    })
});

// Add new magic item
router.post("/", (req, res, next) => {
  const magicItem = new MagicItem({
    name: req.body.name,
    category: req.body.category,
    type: req.body.type,
    rarity: req.body.rarity,
    description: req.body.description,
    attunement: req.body.attunement
  });
  magicItem.save()
    .then(newMagicItem => {
      res.status(201).json({
        message: "Magic item added successfully!",
        magicItem: newMagicItem
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while ADDING new magic item.",
        error: err
      });
    });
});

// edit existing magic item
router.put("/:id", (req, res, next) => {
  MagicItem.findOne({_id: req.params.id})
  .then(magicItem => {
    magicItem.name = req.body.name;
    magicItem.category = req.body.category;
    magicItem.type = req.body.type;
    magicItem.rarity = req.body.rarity;
    magicItem.description = req.body.description;
    magicItem.attunement = req.body.attunement;

    MagicItem.updateOne({_id: req.params.id}, magicItem)
    .then(result => {
      res.status(204).json({
        message: "Magic Item updated successfully!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while EDITING magic item.",
        error: err
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "ERROR magic item not found while EDITING.",
      error: err
    });
  })
});

// remove magic item
router.delete("/:id", (req, res, next) => {
  MagicItem.findOne({_id: req.params.id})
  .then(magicItem => {
    MagicItem.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(204).json({
        message: "Magic Item deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while deleting magic item.",
        error: err
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "ERROR magic item no found while DELETING.",
      error: err
    });
  })
});

module.exports = router;