import { ImSpinner3 } from "react-icons/im";
import { Loading } from "./StarButton";
import { RiDeleteBinFill } from "react-icons/ri";

export default function DeleteButton({
  loading,
  photoId,
}: {
  loading: Loading;
  photoId: string;
}) {
  return (
    <div>
      {loading.state && loading.id === photoId && loading.type === "delete" ? (
        <ImSpinner3 size={20} fill="#808080" className="spin-item" />
      ) : (
        <RiDeleteBinFill size={20} fill="#FF0000" />
      )}
    </div>
  );
}
