import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };
const [currentTheme, setCurrentTheme] = useState(themes.light);
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

const theme = useContext(ThemeContext);

function Favorites() {

  const theme = useContext(ThemeContext);
  return (
    <div className="note-fav" style={{
      background: theme.background,
      color: theme.foreground,
     }}>
      <h1 style={{
        background: theme.background,
        color: theme.foreground,
       }}>Favorites:</h1>
      {notes.map(note => {
        if (note.favorite) {
          return <li style={{
            background: theme.background,
            color: theme.foreground,
           }} key={note.id}>{note.title} </li>;
        } else {
          return null; // Render nothing if not active
        }
      })}
     </div>
  );
}

function ToggleTheme() {
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
   
  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <Favorites />
    </ThemeContext.Provider>
  );
  }

 return (
  
  <div className='app-container'
  // style={{
  //   background: theme.background,
  //   color: theme.foreground,
  // }}
  >
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
            }}
            style={{ background: theme.foreground, color: theme.background }}>x</button>
            <button onClick={() => { handleFav(note)
            }} 
            style={{ background: theme.foreground, color: theme.background }}>♡</button>
        	</div>
        	<h2> {note.title} </h2>
          <p contentEditable="true"> {note.content} </p>
        	<p> {note.label} </p>
      	</div>
    	))}
  	</div>
     {ToggleTheme()}
    </div>
 );
}



export default App;

