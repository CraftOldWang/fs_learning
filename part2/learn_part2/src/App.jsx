import Note from "./components/Note";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import noteService from "./services/notes";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="error">{message}</div>;
};
const App = () => {
    const [notes, setNotes] = useState([]);

    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")//useState("some error happened...");

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    useEffect(() => {
        // console.log("effect");
        noteService.getAll().then((initialNotes) => {
            // console.log("promise fulfilled");
            setNotes(initialNotes);
        });
    }, []);

    // console.log("render", notes.length, "notes");

    const addNote = (event) => {
        event.preventDefault();
        // console.log("button clicked", event.target);
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        };
        noteService.create(noteObject).then((returnedNote) => {
            // console.log(response);
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };

    const handlerNoteChange = (event) => {
        // console.log(event.target);
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        // console.log(`importance of ${id} needs to be toggled`);
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) => (note.id === id ? returnedNote : note))
                );
            })
            .catch((error) => {
                // alert(
                //     `the note '${note.content}' was already deleted from server`
                // );
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);

                setNotes(notes.filter((n) => n.id !== id)); //把那个实际不存在的note删掉
            });
    };

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
                    <Note
                        note={note}
                        key={note.id}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handlerNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
