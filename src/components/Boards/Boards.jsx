// // src/components.Boards.Boards.jsx

// // import { useEffect, useState } from 'react';
// // import { Route, Routes } from 'react-router-dom';
// // import { useLoggedUser } from '../../Contexts/UserContext';

// // import * as boardService from '../../services/boardService'

// export default function Board(props) {
//     // const [boards, setBoards] = useState();
//     // const [error, setError] = useState();

//     // useEffect(() => {
//     //     async function fetchBoards() {
//     //         try {
//     //             const data = await boardService.index()
//     //             console.log(data, " <-- data from express")
//     //             setBoards(data)
//     //             setError('')
//     //         } catch (error) {
//     //             console.log(error)
//     //             setError('Could not load boards. Please try again.')
//     //         }
//     //     }
//     //     fetchBoards();
//     // }, [])

//     if (error) {
//         return (
//             <>
//                 <h2>Your Task Boards</h2>
//                 {/* <p>{error}</p> */}
//                 {props.boards.map((board)=> (
//                     <p key={board._id}>{board.boardName}</p>
//                 ))}
//             </>
//         )
//     }

//     async function handleAddBoard(formData){
//         try {
//             const data = await boardService.create(formData)
//             console.log(data, '<-- express controller response')
//             setBoards(data, ...boards)
//         } catch (error) {
//             console.log(error)
//             // setError('Could not create track.');
//         }
//     }

//     return (
//         <>
//             <h2>Your Task Boards</h2>

//         </>
//     )
// }