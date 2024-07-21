//src/components/Boards/BoardDetails.jsx

import { useParams, Link } from "react-router-dom"
import {useState, useEffect} from 'react';
import * as boardService from '../../services/boardService'
import { useLoggedUser } from "../../Contexts/UserContext";

export default function BoardDetails ({handleDeleteBoard}) {
    const loggedUser = useLoggedUser();
    const {boardId} = useParams();
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
        <h2>{board.boardName}</h2>
        <h3>Tasks:</h3>
        <ul>
            {board.tasks.map((task) => {
                return <li key={task._id}>{task.taskName}</li>
            })}
        </ul>
        <button> <Link to={`/boards/${boardId}/tasks/new`}> Add Tasks</Link></button>
        <button>Edit Board</button>
        {/* {if loggedUser._id === board.owner._id} */}
        <button onClick={() => handleDeleteBoard(boardId)}>Delete Board</button>
        </>
    )
}