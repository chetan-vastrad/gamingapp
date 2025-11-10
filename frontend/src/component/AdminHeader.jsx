const AdminHeader = ({title}) =>{
    return(
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 px-3 py-1 rounded-full">Admin</div>
          </div>
        </div>
    )
}
export default AdminHeader;