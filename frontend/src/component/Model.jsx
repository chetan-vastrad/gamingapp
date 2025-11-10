import { IoMdClose } from "react-icons/io";
const Model = ({ isopen, onClose, title, children, onConfirm,predictedNumber }) => {
    if(!isopen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1c1022] rounded-lg w-11/12 max-w-md p-6 text-white relative">
        <div className="text-center mb-4">
          <h3 className="text-xl">{title}</h3>
          <h2 className="text-3xl font-bold text-[#dda218]">{predictedNumber}</h2>
        </div>
        <div className="mb-6">
            {children}
        </div>
        {onConfirm &&(
            <div className="flex justify-center">
                <button 
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-[#d6ae5194] text-white font-bold hover:bg-[#dda218] transition">Submit</button>
            </div>
        )}
        <div onClick={onClose} className="absolute top-2 right-2">
            <IoMdClose />
        </div>
      </div>
    </div>
  );
};
export default Model;
