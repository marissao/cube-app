const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accessorySchema = require('./Accessory');
// console.log("This is accessorySchema: ", accessorySchema);

const cubeSchema = Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}],
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;