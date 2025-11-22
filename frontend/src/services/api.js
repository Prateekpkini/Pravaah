// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getQueues = () => API.get('/queues');
export const addQueue = (data) => API.post('/queues', data);
export const updateQueue = (id, data) => API.put(`/queues/${id}`, data);

export const getOTs = () => API.get('/ots');
export const updateOT = (id, data) => API.put(`/ots/${id}`, data);

