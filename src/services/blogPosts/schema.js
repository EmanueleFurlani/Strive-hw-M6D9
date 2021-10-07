import mongoose from "mongoose"

const {Schema, model} = mongoose

const BlogPostSchema = new Schema({
  category: { type: String, required: true},
  title: { type: String, required: true},
  cover: { type: String, required: true},
  readTime: {
      value: { type: Number, min: 1, max: 65, required: true },
      unit: { type: String, required: true }
  },
  content: { type: String, required: true },
  comments: [{
      comment: String,
      rate: Number,
      commentedOn: Date,
  }],
   authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
}, { 
  timestamps: true
})

export default model("BlogPost", BlogPostSchema)