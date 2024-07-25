//src/components/Boards/BoardDetails.jsx

import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import * as boardService from '../../services/boardService'
import { useLoggedUser } from "../../Contexts/UserContext";

export default function BoardDetails({ handleDeleteBoard }) {
    const loggedUser = useLoggedUser();
    const { boardId } = useParams();
    // console.log(boardId, '<--board id')
    const [board, setBoard] = useState(null);

    useEffect(() => {
        async function fetchBoard() {
            try {
                const boardData = await boardService.show(boardId)
                console.log(boardData, ' <-- board details from express')
                console.log(loggedUser._id)
                setBoard(boardData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBoard();
    }, [boardId, board])

    // console.log(board, ' <-- board state')


    if (!board) return <p>Loading...</p>

    return (
        <>
        <main>
            <div>
                <h1>{board.boardName}</h1>
                <h3>Tasks:</h3>
                <div className='task-list'>
                    {board.tasks.map((task) => {
                        return (
                            <ul key={task._id}>
                                <li className="task-title">{task.taskName}</li>
                                <li className="task-description">{task.description}</li>
                                <li>Complete within: {task.completeWithin}</li>
                                <li>Category: {task.category}</li>
                                <li>Status: {task.status}</li>
                                <button className="card-btn"><Link to={`/boards/${board._id}/tasks/${task._id}/edit`}>View/edit task</Link></button>
                                {/* {loggedUser._id === board.owner && (
                                    <button onClick={() => handleDeleteTask(boardId)}>Delete Task</button>
                                )} */}
                            </ul>
                        );
                    })}
                </div>
                {/* <ul>
                    {board.tasks.map((task) => {
                        return <li key={task._id}>{task.taskName}</li>
                    })}
                </ul> */}
                <button className="create-btn"> <Link to={`/boards/${boardId}/tasks/new`}>Add Task to Board</Link></button>
                {loggedUser._id === board.owner && (
                    <button onClick={() => handleDeleteBoard(boardId)}>Delete Board</button>
                )}
            </div>
            </main>
        </>
    )
}
