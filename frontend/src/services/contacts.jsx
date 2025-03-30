import axios from "axios";
const baseUrl = 'https://bug-free-giggle-95rp7v4vw963xj6x-3001.app.github.dev/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPhone = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
}

const deletePhone = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const updatePhone = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
    return request.then(response => response.data);
}

export default {
    getAll: getAll,
    addPhone: addPhone,
    deletePhone: deletePhone,
    updatePhone: updatePhone
}