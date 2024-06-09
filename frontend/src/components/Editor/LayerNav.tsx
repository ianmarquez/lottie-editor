import { useLottieStore } from "../../store/lottie";
import Layers from "./Layers";
import MainLayer from "./MainLayer";

export default function LayerNav() {
  const { lottie } = useLottieStore();
  if (!lottie) return null;

  return (
    <div className="flex flex-col gap-2 p-5 bg-base-100 h-full overflow-y-scroll pb-24">
      <MainLayer />
      {lottie.layers.map((layer: unknown) => (
        <Layers layer={layer} />
      ))}
    </div>
  );
}
