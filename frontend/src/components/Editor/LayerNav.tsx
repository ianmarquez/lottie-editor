import { useLottieStore } from "../../store/lottie";
import Layers from "./Layers";
import MainLayer from "./MainLayer";

export default function LayerNav() {
  const { lottie } = useLottieStore();
  if (!lottie) return null;

  return (
    <div className="flex flex-col gap-2 p-5 max-w-[500px] bg-base-100 h-[100vh] overflow-y-scroll flex-shrink">
      <MainLayer />
      {lottie.layers.map((layer: any) => (
        <Layers layer={layer} key={layer.ind} />
      ))}
    </div>
  );
}
