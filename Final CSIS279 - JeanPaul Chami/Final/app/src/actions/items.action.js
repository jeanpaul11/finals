import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function getUserItems(data) {
    const url = `${baseURLApi}/items/getItems`;
    return await axios.post(url, data).then(response => response.data);
}

async function deleteUserOrder(data) {
    const url = `${baseURLApi}/items/deleteOrder`;
    return await axios.post(url, data).then(response => response.data);
}

async function addItem(item) {
    const url = `${baseURLApi}/items/addItem`;
    return await axios.post(url, item).then(response => response.data);
}

async function deletUserData(username) {
    const url = `${baseURLApi}/items/deleteUserData`;
    return await axios.post(url, username).then(response => response.data);
}

async function updateUserOrder(data) {
    const url = `${baseURLApi}/ietms/updateOrder`;
    return await axios.post(url, data).then(response => response.data);
}

export {
    getUserItems,
    deleteUserOrder,
    addItem,
    deletUserData,
    updateUserOrder,
};