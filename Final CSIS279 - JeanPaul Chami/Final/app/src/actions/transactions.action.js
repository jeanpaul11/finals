import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function getUserItems(data) {
    const url = `${baseURLApi}/items/getItems`;
    return await axios.post(url, data).then(response => response.data);
}

async function getUserOrder(data) {
    const url = `${baseURLApi}/items/deleteOrder`;
    return await axios.post(url, data).then(response => response.data);
}


async function updateUserPaymentType(data) {
    const url = `${baseURLApi}/ietms/updateOrder`;
    return await axios.post(url, data).then(response => response.data);


}



export {
    getUserItems,
    getUserOrder,
    updateUserPaymentType,
};