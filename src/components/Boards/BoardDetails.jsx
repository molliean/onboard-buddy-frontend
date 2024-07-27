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

    // async function handleUpdateTask(boardId, taskId, taskFormData) {
    //     try {
    //         const updatedTask = await boardService.updateTask(boardId, taskId, taskFormData);
    //         const updatedBoards = boards.map((board) => {
    //             console.log(board)
    //             if (board._id === boardId) {
    //                 return {
    //                     ...board,
    //                     tasks: board.tasks.map((task) => {
    //                         if (task._id === taskId) {
    //                             return updatedTask;
    //                         } else {
    //                             return task;
    //                         }
    //                     }),
    //                 };
    //             } else {
    //                 return board;
    //             }
    //         });

    //         //   setBoards(updatedBoards);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function fetchBoard() {
    //     try {
    //         const boardData = await boardService.show(boardId)
    //         console.log(boardData, ' <-- board details from express')
    //         console.log(loggedUser._id)
    //         setBoard(boardData)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // fetchBoard();


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
    }, [boardId])

    // console.log(board, ' <-- board state')

    const getCategoryClass = (category) => {
        switch (category) {
            case 'HR Setup':
                return 'hr-setup';
            case 'Account Setup':
                return 'account-setup';
            case 'Meet the Team':
                return 'meet-team';
            case 'Dev Setup':
                return 'dev-setup';
            case 'Company Context':
                return 'company-context';
            default:
                return '';
        }
    }


    if (!board) return <p>Loading...</p>

    return (
        <>
            <main>
                <div>
                    <h1>{board.boardName}</h1>
                    <h3>Your Tasks:</h3>
                    <button className="create-btn"> <Link to={`/boards/${boardId}/tasks/new`}>Add New Task to Board</Link></button>

                    <div className='task-list'>
                        {board.tasks.map((task) => {
                            return (
                                <ul key={task._id}>
                                    <li className={getCategoryClass(task.category)}>{task.category}</li>
                                    <li className="task-title">{task.taskName}</li>
                                    <li className="task-description">{task.description}</li>
                                    <li className="task-completeWithin">Complete within: {task.completeWithin}</li>
                                    <li className="task-status">Status: {task.status}</li>
                                    <button className="card-btn"><Link to={`/boards/${board._id}/tasks/${task._id}/edit`}>View/edit task</Link></button>
                                    {/* {loggedUser._id === board.owner && (
                                    <button onClick={() => handleDeleteTask(boardId)}>Delete Task</button>
                                )} */}
                                </ul>
                            );
                        })}
                    </div>
                    {loggedUser._id === board.owner && (
                        <button onClick={() => handleDeleteBoard(boardId)} className="delete-btn">Delete Board</button>
                    )}
                </div>
            </main>
        </>
    )
}
