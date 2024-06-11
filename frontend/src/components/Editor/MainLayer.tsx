import { useSelectedLayer } from "../../store/editor";
import { useLottieStore } from "../../store/lottie";
import AccordionItem from "../AccordionItem";

export default function MainLayer() {
  const { lottie, setLottie } = useLottieStore();
  const { selectedLayer, setSelectedLayer } = useSelectedLayer();

  const onLayerClick = (index: number, nextState: boolean) => {
    if (nextState) {
      setSelectedLayer(index);
    } else {
      setSelectedLayer(0);
    }
  };
  if (!lottie) return null;

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newLottie = { ...lottie };
    newLottie.w = e.target.value;
    setLottie(newLottie);
  }
  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newLottie = { ...lottie };
    newLottie.h = e.target.value;
    setLottie(newLottie);
  }

  const { layers, assets, ...rest } = lottie;

  return (
    <AccordionItem
      open={selectedLayer === 0}
      index={0}
      header={`(${lottie.v})`}
      onClick={onLayerClick}
    >
      <h1 className="text-primary font-semibold text-4xl">Globals</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Width</span>
        </div>
        <input
          onChange={onWidthChange}
          type="number"
          className="grow input input-bordered w-full max-w-xs"
          defaultValue={rest.w}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Height</span>
        </div>
        <input
          onChange={onHeightChange}
          type="number"
          className="grow input input-bordered w-full max-w-xs"
          defaultValue={rest.h}
        />
      </label>
    </AccordionItem>
  );
}
