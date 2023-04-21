import "./styles.css";
import React from "react";
import Split from "react-split";

export default function App() {
  const [notes, setNotes] = React.useState([]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <h1>Component 1</h1>
          <h1>Component 2</h1>
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note">Create one now</button>
        </div>
      )}
    </main>
  );
}
