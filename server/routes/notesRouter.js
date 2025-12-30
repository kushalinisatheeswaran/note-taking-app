const express=require("express");
const auth =require("../middleware/auth");
const {createNote}=require("../controllers/notesController");
const {getAllNotes}=require("../controllers/notesController");
const {updateNote}=require("../controllers/notesController");
const {deleteNote}= require("../controllers/notesController");


const router =express.Router();

router.post("/",auth, createNote);
router.get("/",auth, getAllNotes);
router.put("/:id",auth,updateNote);
router.delete("/:id",auth,deleteNote);

module.exports=router;