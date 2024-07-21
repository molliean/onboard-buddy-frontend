// src/components/Tasks/TaskForm.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
    taskName: '',
    description: '',
    completeWithin: '1 day',
    category: 'HR Setup',
    status: 'Not Started',
    // feedback: '',
}

export default function TaskForm({ handleAddTask }) {
    const {boardId} = useParams();
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData, '<-- form data');
        // console.log({ ...formData, boardId }, '<-- form data before submit'); // Log the form data
        // console.log(boardId, '<-- board id');
        handleAddTask(boardId, { ...formData, boardId });
        navigate(`/boards/${boardId}`);
    }

    return (
        <>
            <h1>Enter New Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="taskName">Task:</label>
                    <input
                        required
                        type="text"
                        name="taskName"
                        id="taskName"
                        value={formData.taskName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="completeWithin">Complete Within:</label>
                    <select
                        required
                        name="completeWithin"
                        id="completeWithin"
                        value={formData.completeWithin}
                        onChange={handleChange}
                    >
                        <option value="1 day">1 day</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="30 days">30 days</option>
                        <option value="60 days">60 days</option>
                        <option value="90 days">90 days</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        required
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="HR Setup">HR Setup</option>
                        <option value="Account Setup">Account Setup</option>
                        <option value="Meet the Team">Meet the Team</option>
                        <option value="Dev Setup">Dev Setup</option>
                        <option value="Company Context">Company Context</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button type="submit">Add Task to Board</button>
            </form>
        </>

    )
}