import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/persons").then(response => {
            console.log("promise fufilled");
            setPersons(response.data);
        }); // 改一下，不用http  或者用https 会怎样？
    },[]);

    console.log("render", persons.length, " info")

    

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
        console.log({ newName });
        const newPerson = {
            name: newName, //todo 如果用了大括号会怎样？？？？？
            // 会变成 对象 {newName: newName}  (key 是 newName, value 是 newName )
            //如果要访问与原来一样的那个值， 原来是 newPerson.name
            //现在是 newPerson.name.newName
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
            <Filter
                filtername={filterName}
                onChange={handlerFilterNameChange}
            />
            <h2>Add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                onSubmit={addContact}
                onNameChange={handlerNameChange}
                onNumberChange={handlerNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filterName} />
        </div>
    );
};

export default App;
