import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);


  const fetchNotes = async () => {
     
    try{
        const response = await axios.get("http://localhost:5000/api/notes",
        { withCredentials:true,});
      
    setNotes(response.data.notes);
    
}
    catch(error){
       setError("Fetch user notes:" );
    }

    };
useEffect(() => {   
    fetchNotes();
}, []);

const handleCreateOrUpdateNote = async () => {
  try {
    if (editingNoteId) {
      // Update existing note
      await axios.put(
        `http://localhost:5000/api/notes/${editingNoteId}`,
        { note },
        { withCredentials: true }
      );
      
      setEditingNoteId(null);
      setNote("");          // ✅ clear textarea
      fetchNotes();         // ✅ refresh notes
    } else {
      // Create new note
      await axios.post(
        "http://localhost:5000/api/notes",
        { note },
        { withCredentials: true }
      );
      setNote("");
      fetchNotes();
    }
    
  } catch (error) {
    setError("Error creating/updating note: ");
  }
};

const handleEditNote = (note) => {
  setEditingNoteId(note.note_id);
  setNote(note.note);
}

const handleDeleteNote = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      { withCredentials: true }
    );
    fetchNotes();
  } catch (error) {
    setError("Failed to delete note");
  }
};

  return (
    <div className='dashboard-container'>
      <h2 className='dashboard-title'>My Notes</h2>
      <p className='error'>{error}</p>
      <div className='note-input-container'>
        <textarea className='note-textarea' placeholder='Write your note here...'  value={note} onChange={(e)=>setNote(e.target.value)}/>
        <button className='form-button' onClick={handleCreateOrUpdateNote}>
          {editingNoteId ? "Update Note" : "create Note"}</button>
      </div>
      <div className='notes-grid'>


      {notes.length>0 &&  notes.map((note) => ( 
        <div key={note.note_id} className='notes-card'>
          <p className='notes-text'>{note.note}</p>
          <p className='notes-date'>{note.updatedAt &&  new Date(note.updatedAt).toLocaleDateString()}</p>   
        <div className='notes-actions'>
          <button className='notes-edit' onClick={()=>{handleEditNote(note)}}>Edit</button>
          <button className='notes-delete'  onClick={() => handleDeleteNote(note.note_id)} >Delete</button> 
      </div>
      </div>
      ))}

       
      
      </div>
      </div>
  )
}

export default Dashboard