import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

import { Link } from "react-router-dom";

import { PiFilePlusDuotone } from "react-icons/pi";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/", { method: "GET" });
    console.log(response);
    const data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <Link to="/notes/new" className="floating-button">
        <PiFilePlusDuotone />
      </Link>
    </div>
  );
};

export default NotesListPage;
