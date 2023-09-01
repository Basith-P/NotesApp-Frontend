import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;

    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  let handleSubmit = () => {
    console.log("NOTE:", note);
    if (id !== "new") {
      note.body == "" ? deleteNote() : updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <IoIosArrowBack onClick={handleSubmit} />{" "}
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => handleChange(e.target.value)}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
