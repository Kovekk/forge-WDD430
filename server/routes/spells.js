var express = require('express');
var router = express.Router();

const Spell = require('../models/spell');

// place routes here

// Get all spells
router.get("/", (req, res, next) => {
  Spell.find()
    .then(spells => {
      res.status(200).json(spells);
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while GETTING spells",
        error: err
      })
    })
});

// Add new spell
router.post("/", (req, res, next) => {
  const spell = new Spell({
    name: req.body.name,
    description: req.body.description,
    range: req.body.range,
    components: req.body.components,
    ritual: req.body.ritual,
    duration: req.body.duration,
    concentration: req.body.concentration,
    castingTime: req.body.castingTime,
    level: req.body.level,
    school: req.body.school,
    damage: req.body.damage
  });
  spell.save()
    .then(newSpell => {
      res.status(201).json({
        message: "Spell added successfully!",
        spell: newSpell
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while ADDING new spell.",
        error: err
      });
    });
});

// edit existing spell
router.put("/:id", (req, res, next) => {
  console.log(req.params.id)
  Spell.findOne({_id: req.params.id})
  .then(spell => {
    spell.name = req.body.name;
    spell.description = req.body.description;
    spell.range = req.body.range;
    spell.components = req.body.components;
    spell.ritual = req.body.ritual;
    spell.duration = req.body.duration;
    spell.concentration = req.body.concentration;
    spell.castingTime = req.body.castingTime;
    spell.level = req.body.level;
    spell.school = req.body.school;
    spell.damage = req.body.damage;

    Spell.updateOne({_id: req.params.id}, spell)
    .then(result => {
      res.status(204).json({
        message: "Spell updated successfully!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while EDITING spell.",
        error: err
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "ERROR spell not found while EDITING.",
      error: err
    });
  })
});

// remove spell
router.delete("/:id", (req, res, next) => {
  Spell.findOne({_id: req.params.id})
  .then(spell => {
    Spell.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(204).json({
        message: "Spell deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "ERROR while deleting spell.",
        error: err
      });
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "ERROR spell no found while DELETING.",
      error: err
    });
  })
});

module.exports = router;