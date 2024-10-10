import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ToggleTheme, LikeButton } from "./hooksExercise";

function App() {
 return (
  
   <div className='app-container'>
    
    <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
    </form>

    <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
             <button>x</button>
             <button onClick={() => {
              note.favorite = !note.favorite;
              console.log("favorite clicked")
             }}>Like</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
     </div>
     {ToggleTheme()}
     <div className="note-fav">
      <h1>Favorites:</h1>
      {dummyNotesList.map(note => {
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

