import { LayerInfo, Shape } from "../@types/lottie";

export function get(path: string, object: Record<string, any>) {
  if (typeof path !== "string") {
    throw new TypeError("Expecting a string value!");
  }

  let target = object;
  path.split(".").forEach((next) => {
    try {
      target = target[next];
    } catch (err) {
      target = {};
    }
  });

  return target;
}

export function updateColor(
  rgba: number[],
  path: string,
  animationData: Record<string, any>,
) {
  if (typeof animationData !== "object") {
    throw new Error("Expecting a JSON-based format animation data");
  }
  const [r, g, b, a] = rgba;
  const target = get(path, animationData);

  if (target.v && target.v.k) {
    // Effect
    if (target.v.k.every((value: number) => value <= 1)) {
      target.v.k = [
        Math.round((r / 255) * 1000) / 1000,
        Math.round((g / 255) * 1000) / 1000,
        Math.round((b / 255) * 1000) / 1000,
        a,
      ];
    } else {
      target.v.k = [r, g, b, a];
    }
  } else if (target.c && target.c.k) {
    // Shape
    if (target.c.k.every((value: number) => value <= 1)) {
      target.c.k = [
        Math.round((r / 255) * 1000) / 1000,
        Math.round((g / 255) * 1000) / 1000,
        Math.round((b / 255) * 1000) / 1000,
        a,
      ];
    } else {
      target.c.k = [r, g, b, a];
    }
  }

  return animationData;
}

function getNewColors(
  animationData: Record<string, any>,
  startingPath: string,
  existingColorPaths: string[] = [],
) {
  const result: LayerInfo[] = [];
  const layersOrShapes = deepFind(animationData, startingPath);

  if (!Array.isArray(layersOrShapes)) {
    return [];
  }

  for (let i = 0; i < layersOrShapes.length; i++) {
    const el = layersOrShapes[i];
    if (!Array.isArray(el.shapes)) {
      continue;
    }

    const layerInfo: LayerInfo = { name: el.nm, shapes: [] };

    el.shapes.forEach((outerShape: Shape, outerShapeIndex: number) => {
      const actualShapes = outerShape.it || [outerShape];

      actualShapes.forEach((shape: Shape, innerShapeIndex: number) => {
        if (shape.ty !== "fl" && shape.ty !== "st") {
          return;
        }

        const meta: Record<string, any> = {
          name: shape.nm,
          type: shape.ty,
          path: `${startingPath}.${i}.shapes.${outerShapeIndex}${outerShape.it ? `.it.${innerShapeIndex}` : ""}`,
        };

        let color = shape.c.k;

        let [r, g, b] = color.slice(0, 3);
        if (r <= 1 && g <= 1 && b <= 1) {
          // Colors are in [0-1] interval
          [r, g, b] = [r, g, b].map((c) => Math.round(c * 255));
        }
        const a = color[3];

        meta.rgba = [r, g, b, a];

        if (existingColorPaths.includes(meta.path)) {
          return;
        }

        layerInfo.shapes.push(meta);
        existingColorPaths.push(meta.path);
      });
    });

    result.push(layerInfo);
  }

  return result;
}

function deepFind(lottieJson: Record<string, any>, path: string) {
  if (typeof path !== "string") {
    throw new TypeError('Expecting "path" to be a string!');
  }

  const pathParts = path.split(".");
  for (let next of pathParts) {
    try {
      lottieJson = lottieJson[next];
    } catch (err) {
      return null;
    }
  }

  return lottieJson;
}

export function parseColors(lottieAnimation: Record<string, any>) {
  const colorInfo = [];
  const existingColorPaths: string[] = [];

  if (Array.isArray(lottieAnimation.layers)) {
    colorInfo.push(
      ...getNewColors(lottieAnimation, "layers", existingColorPaths),
    );
  }

  if (Array.isArray(lottieAnimation.assets)) {
    for (let i = 0; i < lottieAnimation.assets.length; i++) {
      colorInfo.push(
        ...getNewColors(
          lottieAnimation,
          `assets.${i}.layers`,
          existingColorPaths,
        ),
      );
    }
  }

  return colorInfo;
}

export default {
  parseColors,
};
