import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserBets } from "../../api/userApi"
const History = () =>{
    const {user} = useContext(AuthContext);
    const [bets,setBets] = useState([])
    // Title
    useEffect(()=>{
        document.title="History"
    })
    const allHistory = async () =>{
        try {
        const res = await getUserBets(user._id);
        setBets(res.bets)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        allHistory();
    },[user])
console.log(bets);

    return (
        <div>
            <Header title={"History"}
            leftcomponent={<FaArrowLeft className="text-2xl cursor-pointer" onClick={() => window.history.back()} />}
            />
            <div className="pt-10 max-w-md mx-auto text-white pl-4">
                <h4 className="text-xl font-bold mb-4">Recent History</h4>
               {/* {bets.slice().reverse().map((item)=>(
                <ul key={item._id}>
                    <li>{item.amount}</li>
                    <li>{item.amount}</li>
                </ul>
               ))} */}
                </div>
               <div className="">
                 <table className="mb-20 max-w-md mx-auto text-black pl-4 divide-y divide-gray-200">
                   <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Number
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Played At
                </th>
              </tr>
            </thead>
            <tbody>
                {bets.map((item)=>(
                    <tr key={item._id} className="bg-white">
                    <td className="px-6 py-4 border-b">{item.number}</td>
                    <td className="px-6 py-4 border-b">{item.amount}</td>
                    <td className="px-6 py-4 border-b">{new Date(item.createdAt).toLocaleDateString(
                        "en-GB",{
                            day:"numeric",
                            month:"short",
                            year:"numeric"
                        }
                    )}</td>
                </tr>
                ))}
            </tbody>
                </table>
               </div>
            <Footer/>
        </div>
    )
}
export default History;