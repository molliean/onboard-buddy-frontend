// src/services/boardService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL + '/boards';


// task index function
async function taskIndex(boardId) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}/tasks`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// create task function
async function createTask(boardId, taskFormData) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}/tasks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskFormData)
        });
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

// boards index function
async function index() {
    try {
        const res = await fetch(BACKEND_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// create board function
async function create(boardFormData) {
    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardFormData)
        });
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

// show board details function
async function show(boardId) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// update board function
async function updateBoard(boardId, formData) {
    const res = await fetch(`${BACKEND_URL}/${boardId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json();
    if (res.ok) return data
    throw new Error(data.error)
}

// delete board function
async function deleteBoard(boardId) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }



    // const response = await fetch(`${BACKEND_URL}/${boardId}`, {
    //     method: 'DELETE'
    // })
    // const data = await response.json()
    // if (response.ok) return data
    // throw new Error(data.error)
}



export { index, create, show, updateBoard, deleteBoard, taskIndex, createTask }