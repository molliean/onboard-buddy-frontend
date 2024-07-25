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
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'cache-control': 'no-cache'
        },

        });

        // console.log(res.json())
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// update board function
async function updateBoard(boardId, formData) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (res.ok) return data
    } catch (error) {
        console.log(error)
    }
}

// update task function
async function updateTask(boardId, taskId, taskFormData) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(taskFormData)
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
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
}

// delete task function
async function deleteTask(boardId, taskId) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

// show task details function
async function showTask(boardId, taskId) {
    try {
        const res = await fetch(`${BACKEND_URL}/${boardId}/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
} 




export { 
    index, 
    create, 
    show, 
    updateBoard, 
    deleteBoard, 
    taskIndex, 
    createTask, 
    deleteTask,
    showTask,
    updateTask,
}