const mongoose = require('mongoose');

const spellSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  range: {type: String, required: true},
  components: {type: String},
  ritual: {type: Boolean, default: false},
  duration: {type: String, required: true},
  concentration: {type: Boolean, default: false},
  castingTime: {type: String, required: true},
  level: {type: Number, required: true},
  school: {type: String, required: true},
  damage: {type: String}
});

module.exports = mongoose.model('Spell', spellSchema);