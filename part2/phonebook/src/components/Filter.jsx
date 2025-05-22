

const Filter = ({ filtername, onChange }) => (
    <div>
        filter shown with: <input value={filtername} onChange={onChange} />
    </div>
);


export default Filter