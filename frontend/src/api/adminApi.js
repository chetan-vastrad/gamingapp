import axiosInstance from "./axiosInstance";

export const getAllUsers = async () =>{
  const response = await axiosInstance.get('/user/users');
  return response.data;
}
// View all recharge requests
export const getAllRecharges = async () =>{
  const response = await axiosInstance.get(`/recharge/all`);
   return response.data
}

// Approve/Reject recharge
export const updateRechargeStatus = async (id, status) =>{
const response = await axiosInstance.put(`/recharge/update/${id}`, { status })
return response.data;
};

// View all bets
export const getAllBets = async () =>{
const response = await axiosInstance.get(`/bet/all`);
return response.data;
}

// Declare open number
export const declareOpenNumber = async (opener) =>{
const response = await axiosInstance.post(`/open-number/declare`, opener);
response.data
}

// Get open number history
export const getOpenNumberHistory = async () =>{
const response = await  axiosInstance.get(`/open-number/history`);
return response.data
}
