import { useSelectedLayer } from "../../store/editor";
import { useLottieStore } from "../../store/lottie";
import AccordionItem from "../AccordionItem";
import ColorField from "./ColorField";

type LayersProps = {
  layer: any;
  index: number;
};

export default function Layers(props: LayersProps) {
  const { lottie, setLottie } = useLottieStore();
  const { selectedLayer, setSelectedLayer } = useSelectedLayer();
  const onLayerClick = (index: number, nextState: boolean) => {
    if (nextState) {
      setSelectedLayer(index);
    } else {
      setSelectedLayer(0);
    }
  };

  function onDelete(index: number) {
    setSelectedLayer(0);
    const newLottieFiles = { ...lottie };
    const layers = newLottieFiles.layers.filter(
      (layer: any) => layer.ind !== index,
    );
    newLottieFiles.layers = layers;
    setLottie(newLottieFiles);
  }

  return (
    <AccordionItem
      open={selectedLayer === props.index}
      index={props.index}
      header={`${props.layer.name}`}
      onClick={onLayerClick}
      canDelete
      onDelete={onDelete}
    >
      {props.layer.shapes.map((shape: any, idx: number) => (
        <ColorField shape={shape} key={idx} />
      ))}
    </AccordionItem>
  );
}
