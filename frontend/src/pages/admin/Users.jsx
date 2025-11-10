import Sidebar from "../../component/Sidebar";
import AdminHeader from "../../component/AdminHeader";
import { useEffect, useState } from "react";
import {  getAllUsers } from "../../api/adminApi"

const Users = () =>{
const [users,setUsers] = useState([]);
const [query, setQuery] = useState("")
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
const filteredData = users.filter(users => users.name.toLowerCase().includes(query.toLowerCase()))
 return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <AdminHeader title={"All Users"}/>
        
        {/* Recent Activity / Table */}
        <div className="mb-4">
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}  placeholder="Search User Name" className="border border-blue-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.slice().reverse().map((item)=>(
                <tr key={item._id} className="text-center">
                  <td>{item.name}</td>
                  <td>{item.walletBalance}</td>
                  <td>{item.phone}</td>
                  <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Users;