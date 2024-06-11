// @ts-ignore
import { useEffect, useState } from "react";
import { useLottieStore } from "../../store/lottie";
import { parseColors } from "../../utils/LottieParser";
import Layers from "./Layers";
import MainLayer from "./MainLayer";

export default function LayerNav() {
  const { lottie } = useLottieStore();
  const [layers, setLayers] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!lottie) return;
    const _layers = parseColors(lottie);
    setLayers(_layers.filter((layer: any) => layer.shapes.length > 0));
  }, [lottie]);

  if (!lottie) return null;

  return (
    <div className="flex flex-col gap-2 p-5 max-w-[500px] bg-base-100 h-[100vh] overflow-y-scroll flex-shrink">
      <MainLayer />
      {layers.map((layer: any, idx: number) => (
        <Layers layer={layer} key={idx} index={idx} />
      ))}
    </div>
  );
}
