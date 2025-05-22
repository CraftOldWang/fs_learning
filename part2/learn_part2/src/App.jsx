import Note from "./components/Note";
import { useState } from "react";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const addNote = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        const newObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        };
        setNotes(notes.concat(newObject));
        setNewNote("");
    };

    const handlerNoteChange = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const toggleText = showAll ? "important" : "all";

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button
                    onClick={() => {
                        setShowAll(!showAll);
                    }}
                >
                    show {showAll ? "important" : "all"}
                </button>
            </div>

            <ul>
                {notesToShow.map((note) => (
                    <Note note={note} key={note.id} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handlerNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
