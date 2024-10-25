import mongoose, { get } from "mongoose";

//Define Schema
const moviesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ratings: {type: Number, require: true, min: 1, max: 5},
  money: {
    type: mongoose.Decimal128,
    require: true,
    validate: (v) => v >= 10
  },
  genre: Array,
  isActive: {type: Boolean},
  comments: [
    { value: 
      { type: String }, 
      published: { type: Date, default: Date.now }
  }
  ]
})

//creating a Model
const movieModel = mongoose.model("Movies", moviesSchema);

//Creating a Document
const createDoc = async() => {
  try {
    //Creating new document
    const m1 = new movieModel({
      name: "Extraction 2",
      ratings: 4,
      money: 60000,
      genre: ['action', 'adventure'],
      isActive: true,
      comments: [
        {
          value: "That was an amazing movie."
        }
      ]
    })
    const m2 = new movieModel({
      name: "John Wick",
      ratings: 4,
      money: 60000,
      genre: ['action', 'thriller'],
      isActive: true,
      comments: [
        {
          value: "That was an amazing thriller."
        }
      ]
    })
    const m3 = new movieModel({
      name: "Mission Impossible",
      ratings: 4,
      money: 50000,
      genre: ['action'],
      isActive: true,
      comments: [
        {
          value: "Lalalalaa :("
        }
      ]
    })
    const result = await movieModel.insertMany([m1, m2, m3])
    console.log('User saved succesfully', result)
  } catch(err) {
    console.log(err)
  }
}

const allDoc = async() => {
  try {
    const getAllDoc = await movieModel.find()
    console.clear()
    getAllDoc.forEach((movie) => {
      console.log(movie.name)
    })
  } catch (err) {
    console.log(err)
  }
}

const singleDoc = async() => {
  try {
    const getAllDoc = await movieModel.findById('671b7ea9650755088ad95a26',[ "name", "ratings"] )
    console.log(getAllDoc)
  } catch (err) {
    console.log(err)
  }
}

export {createDoc, allDoc, singleDoc};