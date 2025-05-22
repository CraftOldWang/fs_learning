import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phone";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    useEffect(() => {
        // console.log("effect");
        phoneService.getAll().then((initialPersons) => {
            console.log("promise fufilled");
            setPersons(initialPersons);
        }); // 改一下，不用http  或者用https 会怎样？结果不行
    }, []);

    // console.log("render", persons.length, " info")

    const handlerNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handlerNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handlerFilterNameChange = (event) => {
        // console.log(event.target.value);
        setFilterName(event.target.value);
    };

    const addContact = (event) => {
        event.preventDefault();
        // console.log(event.target);
        const newPerson = {
            name: newName,
            number: newNumber,
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
            phoneService.create(newPerson).then((newP) => {
                // console.log(p)
                setPersons(persons.concat(newP));
                setNewName("");
                setNewNumber("");
            });
        }
    };

    const removeContact = (personToDelete) => {
        // 如果删除了不在的人。。
        // console.log("remove....")
        console.log("remove", personToDelete);
        if (window.confirm(`Delete ${personToDelete.name}`)) {
            phoneService
                .remove(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== personToDelete.id));
                })
                //原来有错误也没关系吗，只要我catch并处理了。
                .catch((error)=>{
                    alert(`the person '${personToDelete.name}' was already deleted from server`)
                });
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
            <Persons
                persons={persons}
                filter={filterName}
                handleRemove={removeContact}
            />
        </div>
    );
};

export default App;
