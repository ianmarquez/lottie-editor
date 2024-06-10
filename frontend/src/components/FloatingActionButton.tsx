import { useRef } from "react";
import { FiFile, FiMoreHorizontal } from "react-icons/fi";
import { useLottieStore } from "../store/lottie";
import cn from "../utils/twMerge";
import UploadDialog from "./UploadDialog";

function UploadModal() {
  const { lottie } = useLottieStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  if (!lottie) return null;
  return (
    <>
      <button
        className="btn btn-circle w-20 h-20 btn-secondary"
        onClick={() => modalRef?.current?.showModal()}
      >
        <div className="w-full h-full rounded-full flex flex-col justify-center items-center">
          <FiFile size={24} />
        </div>
      </button>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className="modal flex flex-col items-center justify-center"
      >
        <div className="modal-box bg-transparent shadow-none">
          <UploadDialog />
        </div>
      </dialog>
    </>
  );
}

export default function FloatingActionButton() {
  const { lottie } = useLottieStore();

  if (!lottie) return;
  return (
    <div className="fixed bottom-20 right-5 dropdown dropdown-top dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className={cn(
          "btn m-1 btn-circle w-20 h-20 bg-primary text-zinc-700",
          "hover:text-white duration-300",
          lottie && "hover:bg-secondary",
        )}
      >
        <FiMoreHorizontal size={30} />
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2">
        <li>
          <UploadModal />
        </li>
      </ul>
    </div>
  );
}
