const db =require("../db");

const createNote=async(req,res)=>{
    try{
        const {note}=req.body;
        const user_id=req.user.id;
        const date =new Date().toISOString().split("T")[0];
        const [result] =await db.query("INSERT INTO notes (user_id,note,date)VALUES (?,?,?)",[user_id,note,date]);
        res.status(201).json({message:"note create",note_id:result.insertId});

    }catch(error){
        res.status(500).json({message:"server error",error:error.message });
    }
};

const getAllNotes=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const [notes]=await db.query("SELECT * FROM notes WHERE user_id = ?",[user_id]);
        res.status(200).json({notes});
    }catch(error){
        res.status(500).json({message:"server error",error:error.message });
    }
};

const updateNote=async(req,res)=>{
    try{
        const {note}=req.body;
        const user_id=req.user.id;
        const note_id=req.params.id;
        const [result]=await db.query("UPDATE notes SET note = ? WHERE user_id = ? AND note_id = ?",[note,user_id,note_id]);
        if(result.affectedRows===0){
            return res.status(404).json({message:"note not found"});
        }
        res.status(200).json({message:"note updated"});
    }catch(error){
        res.status(500).json({message:"server error",error:error.message });
    }
};
const deleteNote=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const note_id=req.params.id;
        const [result]=await db.query("DELETE FROM notes WHERE user_id = ? AND note_id = ?",[user_id,note_id]);
        if(result.affectedRows===0){
            return res.status(404).json({message:"note not found"});
        }
        res.status(200).json({message:"note deleted"});
    }catch(error){
        res.status(500).json({message:"server error",error:error.message });
    }
};

module.exports={createNote,getAllNotes ,updateNote,deleteNote};