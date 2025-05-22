import { useState } from "react";

const App = () => {
    // const [persons, setPersons] = useState([
    //     { name: "Arto Hellas", number: "114514" },
    // ]);
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    const addName = (event) => {
        event.preventDefault();
        console.log(event.target);
        const newPerson = {
            name: newName, //todo 如果用了大括号会怎样？？？？？
        };
        const hasEqual = persons.reduce(
            (hasFindEq, curPerson) => hasFindEq || newName === curPerson.name,
            false
        );

        console.log("hasEqual", hasEqual);

        if (hasEqual) {
            alert(`${newName} is already added to phonebook`);
            // setNewName("");
        } else {
            setPersons(persons.concat(newPerson));
            setNewName("");
        }
    };

    const handlerNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handlerNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handlerFilterNameChange = (event) => {
        console.log(event.target.value);
        setFilterName(event.target.value);
    };

    const addContact = (event) => {
        event.preventDefault();
        console.log(event.target);
        const newPerson = {
            name: newName, //todo 如果用了大括号会怎样？？？？？
            number: newNumber,
            id: persons.length + 1, // 姑且这样。。。
        };
        const hasEqual = persons.reduce(
            (hasFindEq, curPerson) =>
                hasFindEq ||
                (newName === curPerson.name && newNumber === curPerson.number),
            false
        );

        console.log("hasEqual", hasEqual);

        if (hasEqual) {
            alert(`${newName} : ${newNumber},is already added to phonebook`);
            // setNewName("");
        } else {
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
    };
    return (
        <div>
            {/* <div>debug: {newName}</div> */}
            <h2>Phonebook</h2>
            <div>
                filter shown with:{" "}
                <input value={filterName} onChange={handlerFilterNameChange} />
            </div>
            <h2>Add a new</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handlerNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handlerNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons
                    .filter((person) =>
                        person.name
                            .toLowerCase()
                            .includes(filterName.toLowerCase())
                    )
                    .map((person) => (
                        <div key={person.id}>
                            {person.name} {person.number}
                        </div>
                    ))
                // 这个有点丑陋， 不应该用数组下标作为id的
            }
        </div>
    );
};

export default App;
