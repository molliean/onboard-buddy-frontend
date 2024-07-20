import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const initialState = {
    boardName: '',
}

export default function BoardForm({handleAddBoard}){
    const [formData, setFormData] = useState(initialState);
    // const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleAddBoard(formData);
    }


    return(
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="boardName">Board Name</label>
                <input 
                    required 
                    type="text"
                    name="boardName"
                    id="baordName"
                    value={formData.boardName}
                    onChange={handleChange} />
                <button type="submit">CREATE</button>
            </form>
        </main>
    )

}