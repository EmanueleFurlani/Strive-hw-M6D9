import express from "express"
import q2m from "query-to-mongo"
import AuthorModel from "./schema.js"

const AuthorsRouter = express.Router()

AuthorsRouter.post("/", async (req, res, next)=>{
    try {
        const newAuthor = new AuthorModel(req.body)
        const { _id } =await newAuthor.save()
        res.status(201).send({_id})
        
    } catch (error) {
        next(error)
    }
})

AuthorsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query)

    const total = await AuthorModel.countDocuments(query.criteria)
    const authors = await AuthorModel.find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort)

    res.send({ links: query.links("/authors", total), total, authors, pageTotal: Math.ceil(total / query.options.limit) })
  } catch (error) {
    next(error)
  }
})

export default AuthorsRouter