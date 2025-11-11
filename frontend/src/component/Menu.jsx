import { NavLink } from "react-router-dom";
const Menu = () =>{
    return (
        <div className="bg-[#795f3a] text-white flex rounded-tr rounded-br z-10 flex-col mt-6 p-4 space-y-4 fixed right-20 top-5 w-64 h-90 pb-10">
            <p className="text-sm">Menu</p>
            <NavLink to="/" className="border-b pb-2">Home</NavLink>
            <NavLink to="/wallet" className="border-b pb-2">Wallet</NavLink>
            <NavLink to="/history" className="border-b pb-2">History</NavLink>
            <NavLink to="/profile" className="border-b pb-2">Profile</NavLink>
        </div>
    )
}
export default Menu;