// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


// const getUser = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token){
//       return null;
//     }
//     const [header, payload, signature] = token.split('.');
//     const decodedPayload = atob(payload);
//     if (!decodedPayload) {
//       throw new Error('Invalid token');
//     }
//     const user = JSON.parse(decodedPayload);
//     return user;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw error
//   }
// }

const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const user = JSON.parse(atob(token.split('.')[1]));
  return user;
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Something went wrong');
    }
    localStorage.setItem('token', json.token);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Something went wrong');
    }
    if (json.token) {
      localStorage.setItem('token', json.token);
      try {
        const user = JSON.parse(atob(json.token.split('.')[1]));
        return user;
      } catch (error) {
        throw new Error('Failed to decode token')
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signout = () => {
  localStorage.removeItem('token');
};

export { signup, signin, getUser, signout };
