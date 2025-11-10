import axiosInstance from "./axiosInstance";

const createUser = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
}
const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}
// User Profile APIs
const getUserProfile = async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
}
const updateUserProfile = async (userId, profileData) => {
    const response = await axiosInstance.put(`/user/${userId}`, profileData);
    return response.data;
}
// Wallet APIs
const getUserWallet = async (userId) => {
    const response = await axiosInstance.get(`/wallet/${userId}`);
    return response.data;
}
const createRechargeRequest = async (userId, amount) => {
    const response = await axiosInstance.post(`/recharge/request`, { userId, amount });
    return response.data;
}
const getUserRecharges = async (userId) => {
    const response = await axiosInstance.get(`/recharge/user/${userId}`);
    return response.data;
}
// Bet APIs
const placeBet = async (userId, number, amount) => {
    const response = await axiosInstance.post(`/bet/place/${userId}`, {number, amount });
    return response.data;
}
const getUserBets = async (userId) => {
    const response = await axiosInstance.get(`/bet/user/${userId}`);
    return response.data;
}
export { createUser, loginUser, getUserProfile, updateUserProfile, getUserWallet, createRechargeRequest, getUserRecharges, placeBet, getUserBets };
