import { useSelectedLayer } from "../../store/editor";
import { useLottieStore } from "../../store/lottie";
import AccordionItem from "../AccordionItem";

type LayersProps = {
  layer: any;
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
      open={selectedLayer === props.layer.ind}
      index={props.layer.ind}
      header={`${props.layer.nm}(${props.layer.ind})`}
      onClick={onLayerClick}
      canDelete
      onDelete={onDelete}
    >
      {JSON.stringify(props.layer)}
    </AccordionItem>
  );
}
