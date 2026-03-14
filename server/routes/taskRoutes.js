const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

router.get("/", async (req,res)=>{
const tasks = await Task.find()
res.json(tasks)
})

router.post("/", async (req,res)=>{
const task = new Task(req.body)
await task.save()
res.json(task)
})

router.delete("/:id", async (req,res)=>{
await Task.findByIdAndDelete(req.params.id)
res.json({message:"Deleted"})
})

module.exports = router
router.put("/:id", async (req,res)=>{
try{

const task = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(task)

}catch(err){
res.status(500).json(err)
}
})