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

        const foundEqual = persons.reduce(
            (hasFindEq, curPerson) =>
                hasFindEq ||
                (newName === curPerson.name && newNumber === curPerson.number),
            false
        );
        let eqPerson;
        const foundNameEqual = persons.find((p) => {
            if (p.name === newName) {
                eqPerson = p;
                return true;
            }
            return false;
        });
        console.log("foundEqual", foundEqual);
        console.log("foundNameEqual", foundNameEqual);
        console.log("eqPerson", eqPerson);

        if (foundEqual) {
            alert(`${newName} : ${newNumber},is already added to phonebook`);
            // setNewName("");
        } else if (foundNameEqual !== undefined) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old numberwith a new one?`
                )
            ) {
                const changedPerson = { ...eqPerson, number: newNumber };
                console.log('changedPerson', changedPerson)
                phoneService.update(changedPerson.id, changedPerson).then(
                    personUpdated => {
                        console.log('personUpdated', personUpdated)
                        setPersons(persons.map(p=>p.id === personUpdated.id ? personUpdated: p))
                    }
                )
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
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
                    setPersons(
                        persons.filter((p) => p.id !== personToDelete.id)
                    );
                })
                //原来有错误也没关系吗，只要我catch并处理了。
                .catch((error) => {
                    alert(
                        `the person '${personToDelete.name}' was already deleted from server`
                    );
                    setPersons(persons.filter(p=>p.id !== personToDelete.id))
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
