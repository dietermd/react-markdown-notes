import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => {
    const noteTitleClassName = `title ${
      note.id === props.currentNote.id ? "selected-note" : ""
    }`;
    return (
      <div key={note.id}>
        <div
          className={noteTitleClassName}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">Note {index + 1}</h4>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.createNewNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
