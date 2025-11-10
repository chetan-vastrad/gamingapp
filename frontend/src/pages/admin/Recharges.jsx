import Sidebar from "../../component/Sidebar";
import AdminHeader from "../../component/AdminHeader";
import { useEffect, useState } from "react";
import { getAllRecharges,updateRechargeStatus } from "../../api/adminApi";
const Recharges = () =>{
  const [recharges,setRecharges] = useState([])
  // Title Start
    useEffect(()=>{
        document.title="All Recharges"
    })
// Title End
// Load All recharges
    const loadAllRecharges = async () =>{
      try {
        const res = await getAllRecharges();
        setRecharges(res.recharges);
        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }
    const updateRecharges = async (id) =>{
      try {
        const res = await updateRechargeStatus(id,"completed");
        if(res.success){
         setRecharges((pre)=>
          pre.map((r) => (r._id === id ? { ...r, status: "completed" } : r))
        )
        }
      } catch (error) {
        
      }
    }
    useEffect(()=>{
loadAllRecharges()
    },[])
 return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <AdminHeader title={"All Recharges"}/>
        

        {/* Recent Activity / Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Raised Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Approval
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recharges.slice().reverse().map((item)=>(
                <tr key={item._id}>
                <td className="px-6 py-4">{item.userId === null ? "abc":item.userId.name }</td>
                <td className="px-6 py-4">{item.amount}</td>
                <td className="px-6 py-4">
                  {/* <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm" > */}
                  <span 
                  className={
                    item.status ==="completed" 
                    ?"bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                    :"bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
                  }
                    >
                   {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}</td>
                <td className="px-6 py-4">
                  <button className={
                    item.status ==="completed"
                    ? "bg-green-500 text-white p-2 rounded-xl"
                    :"bg-green-100 text-green-500 p-2 rounded-xl"
                  }
                  disabled={item.status==="completed"}
                  onClick={()=>updateRecharges(item._id)}
                  >
                    {item.status === "completed" ? "Approved" : "Approve"}
                  </button>
                </td>
              </tr>
              ))}
              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Recharges;