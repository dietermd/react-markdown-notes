import "./styles.css";
import React from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

export default function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    console.log(notes.length);
    if (notes.length < 1) {
      setCurrentNoteId(newNote.id);
    }
  }

  function uptdateNote(text) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id == currentNoteId ? { ...note, body: text } : note
      )
    );
  }

  function getCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            setCurrentNoteId={setCurrentNoteId}
            createNewNote={createNewNote}
            currentNote={getCurrentNote()}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={getCurrentNote()} uptdateNote={uptdateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
