import _ from "lodash";
import { useState } from "react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { FiX } from "react-icons/fi";
import { useLottieStore } from "../../store/lottie";

function Color(props: {
  color: number[];
  label: string;
  path: string;
  onUpdate: (rgbColor: number[], path: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const onColorChange = _.debounce(({ r, g, b, a }: RgbaColor) => {
    props.onUpdate([r, g, b, a], props.path);
  }, 50);

  return (
    <div className="flex flex-col gap-2 relative">
      {isVisible && (
        <>
          <button
            className="z-10 absolute btn btn-xs btn-error btn-circle -right-3 -top-3 h-[10px] text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          >
            <FiX />
          </button>
          <RgbaColorPicker
            style={{ width: "100%" }}
            onChange={onColorChange}
            color={{
              r: props.color[0],
              g: props.color[1],
              b: props.color[2],
              a: props.color[3],
            }}
          />
        </>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(true);
        }}
        className="btn w-full max-w-xs text-black cursor pointer min-w-xs"
        style={{
          backgroundColor: `rgba(${props.color.join(",")})`,
        }}
      >
        {props.label}
      </button>
    </div>
  );
}

interface ColorFieldProps {
  shape: {
    name: string;
    type: string;
    path: string;
    rgba?: number[];
  };
}

export default function ColorField({ shape }: ColorFieldProps) {
  const { updateColor } = useLottieStore();
  if (!shape || !shape.rgba) return;

  function onChange(newColor: number[], path: string) {
    updateColor(path, newColor);
  }

  return (
    <div className="max-w-xs flex flex-col gap-2 w-80">
      <Color
        label={shape?.name}
        color={shape.rgba}
        path={shape.path}
        onUpdate={(newColor, path) => onChange(newColor, path)}
      />
    </div>
  );
}
