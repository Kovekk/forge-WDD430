const mongoose = require('mongoose');

const magicItemSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  type: {type: String},
  rarity: {type: String, required: true},
  description: {type: String},
  attunement: {type: Boolean, required: true}
});

module.exports = mongoose.model('MagicItem', magicItemSchema);