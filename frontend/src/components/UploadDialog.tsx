import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiFile } from "react-icons/fi";

import { useLoadingStore } from "../store/loading";
import { useLottieStore } from "../store/lottie";
import cn from "../utils/twMerge";

export default function UploadDialog() {
  const reader = new FileReader();
  const { setLottie } = useLottieStore();
  const { setLoading } = useLoadingStore();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setLoading(true);
    reader.onload = (event) => {
      if (!event || !event.target) return;
      const result = event.target.result as string;
      const uploadedLottie = JSON.parse(result);
      console.log(uploadedLottie);
      setLottie(uploadedLottie);
      setLoading(false);
    };
    reader.readAsText(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "p-10 text-zinc-700 h-64 min-w-[425px] flex flex-col items-center justify-center bg-gray-300 transition-colors duration-300",
        "border-dashed border-2 border-zinc-400 rounded-lg ",
        "hover:border-base-100 hover:bg-gray-200",
      )}
    >
      <input {...getInputProps()} accept="application/json" />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-2">
        <FiFile size={50} />
        <p className="text-lg">
          <span className="font-semibold">Click to Upload</span> or drag and
          drop here
        </p>
        <p className="text-sm text-zinc-600">
          (Only .json files will be accepted)
        </p>
      </div>
    </div>
  );
}
