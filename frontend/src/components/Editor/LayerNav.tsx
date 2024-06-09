import { useLottieStore } from "../../store/lottie";
import MainLayer from "./MainLayer";

export default function LayerNav() {
  const { lottie } = useLottieStore();
  if (!lottie) return null;

  return (
    <div className="flex flex-col gap-2 p-5 bg-base-100 h-full min-w-96">
      <MainLayer />
    </div>
  );
}
