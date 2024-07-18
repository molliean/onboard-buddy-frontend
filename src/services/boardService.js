// src/services/boardService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL + '/boards';

async function index(){
    const response = await fetch(BACKEND_URL)
    const data = await response.json()
    if(response.ok) return data
    throw new Error(data.error)
}

async function create(formData){
    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if(response.ok) return data
    throw new Error(data.error)
}

async function updateBoard(boardId, formData){
    const response = await fetch(`${BACKEND_URL}/${boardId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if(response.ok) return data
    throw new Error(data.error)
}

async function deleteBoard(boardId){
    const response = await fetch(`${BACKEND_URL}/${boardId}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    if(response.ok) return data
    throw new Error(data.error)
}

export { index, create, updateBoard, deleteBoard }