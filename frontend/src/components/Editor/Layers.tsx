import { useEffect, useState } from "react";
import _ from "lodash";
import traverse from "traverse";

import { useSelectedLayer } from "../../store/editor";
import { useLottieStore } from "../../store/lottie";
import AccordionItem from "../AccordionItem";
import ColorField from "./ColorField";

type LayersProps = {
  layer: any;
};

export default function Layers(props: LayersProps) {
  const { lottie, setLottie } = useLottieStore();
  const { selectedLayer, setSelectedLayer } = useSelectedLayer();
  const [fills, setFills] = useState<any[]>([]);
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

  useEffect(() => {
    const _fills: any[] = [];
    traverse(props.layer).forEach((leaf) => {
      if (["fl", "st", "gf", "gs"].indexOf(leaf.ty) > 0) {
        _fills.push(leaf);
      }
    });
    setFills(_fills);
  }, []);

  if (fills.length === 0) return null;

  console.log(props.layer.shapes);
  return (
    <AccordionItem
      open={selectedLayer === props.layer.ind}
      index={props.layer.ind}
      header={`${props.layer.nm}(${props.layer.ind})`}
      onClick={onLayerClick}
      canDelete
      onDelete={onDelete}
    >
      {fills.map((fill, idx) => (
        <ColorField fill={fill} key={idx} />
      ))}
    </AccordionItem>
  );
}
