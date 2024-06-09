import _ from "lodash";
import { useEffect, useState } from "react";
import { RgbColorPicker, RgbaColorPicker } from "react-colorful";
import {
  toRGBADecimal,
  toRGBADecimalGradient,
} from "../../utils/rgbaConverter";

type ColorFieldProps = {
  fill: any;
};

type KeyframeColor = {
  time: number;
  start: number[];
  end: number[];
  index: number;
};

function Color(props: {
  type: "gradient" | "solid";
  color: number[];
  onUpdate: (rgbColor: number[], selectedIndex: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [colorPicker, setColorPicker] = useState(
    props.type === "gradient" ? [255, 255, 255, 0] : [255, 255, 255],
  );

  function onButtonClick(idx: number, rgbColor: number[]) {
    setIsVisible((prevState) => !prevState);
    setSelectedIndex(idx);
    setColorPicker(rgbColor);
  }

  if (props.type === "solid") {
    return (
      <>
        {isVisible && (
          <RgbColorPicker
            className="w-full"
            onChange={console.log}
            color={{
              r: colorPicker[0],
              g: colorPicker[1],
              b: colorPicker[2],
            }}
          />
        )}
        <button
          onClick={() => onButtonClick(0, props.color)}
          className="btn  w-full max-w-xs text-black cursor pointer"
          style={{
            backgroundColor: `rgb(${props.color.join(",")})`,
          }}
        >
          {props.color.join(" ")}
        </button>
      </>
    );
  }

  const rgbaColors = _.chunk(props.color, 4);

  return (
    <>
      {isVisible && (
        <RgbaColorPicker
          className="w-full"
          onChange={console.log}
          color={{
            r: colorPicker[0],
            g: colorPicker[1],
            b: colorPicker[2],
            a: colorPicker[3],
          }}
        />
      )}

      {rgbaColors.map((color, idx) => {
        return (
          <button
            key={idx}
            onClick={() => onButtonClick(idx, color)}
            className="btn  w-full max-w-xs text-black cursor pointer"
            style={{
              backgroundColor: `rgba(${color.join(",")})`,
            }}
          >
            {color.join(" ")}
          </button>
        );
      })}
    </>
  );
}

export default function ColorField(props: ColorFieldProps) {
  const [color, setColor] = useState<number[]>([]);
  const [keyframeColor, setKeyframeColor] = useState<KeyframeColor[]>([]);

  useEffect(() => {
    if (!props.fill) return;
    if (props.fill.ty === "st" || props.fill.ty === "fl") {
      if (props.fill.c.a === 0) {
        setColor(toRGBADecimal(props.fill.c.k));
      } else {
        let keyframedColors: KeyframeColor[] = [];
        props.fill.c.k.forEach((value: any, idx: number) => {
          const startColor = toRGBADecimal(value.s);
          const endColor =
            "e" in value ? toRGBADecimal(value.e) : [255, 255, 255, 0];
          keyframedColors.push({
            time: value.t,
            start: startColor,
            end: endColor,
            index: idx,
          });
        });
        setKeyframeColor(keyframedColors);
      }
    } else if (props.fill.ty === "gf" || props.fill.ty === "gs") {
      if (props.fill.g.k.a === 0) {
        console.log(props.fill.g.k);
        setColor(toRGBADecimalGradient(props.fill.g.k.k));
      } else if (props.fill.g.k.a === 1) {
        let keyFramedColors: KeyframeColor[] = [];
        props.fill.g.k.k.forEach((value: any, idx: number) => {
          const startColor = toRGBADecimalGradient(value.s);
          const endColor =
            "e" in value ? toRGBADecimalGradient(value.e) : [255, 255, 255, 0];
          keyFramedColors.push({
            time: value.t,
            start: startColor,
            end: endColor,
            index: idx,
          });
        });
        setKeyframeColor(keyFramedColors);
      }
    }
  }, []);

  const isGradient = props.fill.ty === "gf" || props.fill.ty === "gs";
  if (color) {
    return (
      <label className="form-control w-full max-w-xs flex flex-col gap-2">
        <div className="label">
          <span className="label-text">
            {props.fill.mn} - {props.fill.nm}
          </span>
        </div>
        <Color
          type={isGradient ? "gradient" : "solid"}
          color={color}
          onUpdate={(newColor, selectedIndex) =>
            console.log(newColor, selectedIndex)
          }
        />
      </label>
    );
  }
  return <h1>text</h1>;
}
