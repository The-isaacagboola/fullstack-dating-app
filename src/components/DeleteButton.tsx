import { ImSpinner3 } from "react-icons/im";
import { RiDeleteBinFill } from "react-icons/ri";

export default function DeleteButton({ loading }: { loading: boolean }) {
  return (
    <div>
      {loading ? (
        <ImSpinner3 size={20} fill="#808080" className="spin-item" />
      ) : (
        <RiDeleteBinFill size={20} fill="#FF0000" />
      )}
    </div>
  );
}
