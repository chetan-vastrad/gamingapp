import { FaUsers, FaMoneyBill, FaChartLine, FaCog } from "react-icons/fa";
import { getAllUsers } from "../../api/adminApi"
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../component/Sidebar";
import AdminHeader from "../../component/AdminHeader";

const Dashboard = () => {
const [users,setUsers] = useState([])
const loadAllUsers = async() =>{
  try {
    const res = await getAllUsers();
    setUsers(res.users)
  } catch (error) { 
  }
}  
useEffect(()=>{
  loadAllUsers()
},[])    
console.log("All USeres",users);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <AdminHeader title={"Dashboard"}/>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-gray-500 text-sm">Users</h2>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-gray-500 text-sm">Transactions</h2>
            <p className="text-2xl font-bold">3,567</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-gray-500 text-sm">Revenue</h2>
            <p className="text-2xl font-bold">$25,670</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-gray-500 text-sm">Pending Requests</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Recent Activity / Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Recent Registered Users</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.slice().reverse().slice(0,8).map((item)=>(
                <tr key={item._id}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.walletBalance}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}</td>
              </tr>
              ))
               }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
