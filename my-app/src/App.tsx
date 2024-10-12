import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ToggleTheme } from "./hooksExercise";
import React, { useState, useEffect, useContext } from 'react';

function App() {
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };

const [createNote, setCreateNote] = useState(initialNote);

const createNoteHandler = (event: React.FormEvent) => {
   event.preventDefault();
   console.log("title: ", createNote.title);
   console.log("content: ", createNote.content);
   createNote.id = notes.length + 1;
   setNotes([createNote, ...notes]);
   setCreateNote(initialNote);
 };


 const handleDelete = (noteId: number) => {
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  setNotes(updatedNotes);
 }

 const handleFav = (myNote: Note) => {
  myNote.favorite = !myNote.favorite
  const updatedNotes = notes.filter((note) => note.id === note.id);
  setNotes(updatedNotes)
 }


  // const updateLikes = (Note) => {
  //   setNotes(note.favorite = !note.favorite);
  // };

 return (
  
  <div className='app-container'>
  	<form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>

  	<div className="notes-grid">
    	{notes.map((note) => (
      	<div
        	key={note.id}
        	className="note-item"
      	>
        	<div className="notes-header">
          	<button onClick={() => { handleDelete(note.id)
            }}>x</button>
            <button onClick={() => { handleFav(note)
            }}>♡</button>
        	</div>
        	<h2> {note.title} </h2>
          <p contentEditable="true"> {note.content} </p>
        	<p> {note.label} </p>
      	</div>
    	))}
  	</div>
     {ToggleTheme()}
     <div className="note-fav">
      <h1>Favorites:</h1>
      {notes.map(note => {
        if (note.favorite) {
          return <li key={note.id}>{note.title}</li>;
        } else {
          return null; // Render nothing if not active
        }
      })}
     </div>
    </div>
 );
}



export default App;

