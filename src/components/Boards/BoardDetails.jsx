//src/components/Boards/BoardDetails.jsx

import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import * as boardService from '../../services/boardService'
import { useLoggedUser } from "../../Contexts/UserContext";
import styles from './BoardDetails.module.css'

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
                setBoard(boardData.board)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBoard();
    }, [boardId])

    // console.log(board, ' <-- board state')


    if (!board) return <p>Loading...</p>

    return (
        <>
            <div className={styles.boardDetails}>
                <h2>{board.boardName}</h2>
                <h3>Tasks:</h3>
                <div>
                    {board.tasks.map((task) => {
                        return (
                            <div key={task._id} className={styles.taskCard}>
                                <div className={styles.taskTitle}>{task.taskName}</div>
                                <p>{task.description}</p>
                                <p>Complete within: {task.completeWithin}</p>
                                <p className={styles.category}>{task.category}</p>
                                <p>{task.status}</p>
                                <button><Link to={`/boards/${board._id}/tasks/${task._id}/edit`}>View/edit task</Link></button>
                                {/* {loggedUser._id === board.owner && (
                                    <button onClick={() => handleDeleteTask(boardId)}>Delete Task</button>
                                )} */}
                            </div>
                        );
                    })}
                </div>
                {/* <ul>
                    {board.tasks.map((task) => {
                        return <li key={task._id}>{task.taskName}</li>
                    })}
                </ul> */}
                <button> <Link to={`/boards/${boardId}/tasks/new`}>Add Task to Board</Link></button>
                {loggedUser._id === board.owner && (
                    <button onClick={() => handleDeleteBoard(boardId)}>Delete Board</button>
                )}
            </div>
        </>
    )
}