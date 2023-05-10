import "./styles.css";
import React from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

export default function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((prevNotes) => {
      const index = prevNotes.findIndex((n) => n.id === currentNoteId);
      const updNote = prevNotes.splice(index, 1)[0];
      updNote.body = text;
      prevNotes.unshift(updNote);
      return [...prevNotes];
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId));
    if (currentNoteId === noteId) {
      const nextIndex = notes.findIndex((n) => n.id !== noteId);
      if (nextIndex !== -1) {
        setCurrentNoteId(notes[nextIndex].id);
      }
    }
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            setCurrentNoteId={setCurrentNoteId}
            createNewNote={createNewNote}
            currentNote={currentNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
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
