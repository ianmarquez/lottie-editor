import { useSelectedLayer } from "../../store/editor";
import { useLottieStore } from "../../store/lottie";
import AccordionItem from "../AccordionItem";
import ColorField from "./ColorField";

type LayersProps = {
  layer: any;
  index: number;
};

export default function Layers(props: LayersProps) {
  const type = props.layer.shapes[0].path.split(".")[0];
  const { deleteLayer } = useLottieStore();
  const { selectedLayer, setSelectedLayer } = useSelectedLayer();
  const onLayerClick = (index: number, nextState: boolean) => {
    if (nextState) {
      setSelectedLayer(index);
    } else {
      setSelectedLayer(0);
    }
  };

  function onDelete() {
    setSelectedLayer(0);
    deleteLayer(props.layer.shapes[0].path);
    console.log(type);
  }

  return (
    <AccordionItem
      open={selectedLayer === props.index}
      index={props.index}
      header={`${props.layer.name}`}
      onClick={onLayerClick}
      canDelete={type === "layers"}
      onDelete={onDelete}
    >
      {props.layer.shapes.map((shape: any, idx: number) => (
        <ColorField shape={shape} key={idx} />
      ))}
    </AccordionItem>
  );
}
