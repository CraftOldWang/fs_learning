const PersonDetail = ({ person, onClickDelete }) => {
    return (
        <div>
            {person.name} {person.number}{" "}
            <button onClick={onClickDelete}>delete</button>
        </div>
    );
};

const Persons = ({ persons, filter, handleRemove }) =>
    persons
        .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
            <PersonDetail
                key={person.id}
                person={person}
                onClickDelete={() => handleRemove(person)}
            />
        ));
// 因为这个是数组，所以可以不用根元素包住 。。。
//   [<div>...</div>, <div>...</div>, <div>...</div> ]
// React 中 ，除了用一个根元素包住全部， 还可以返回数组...

export default Persons;
