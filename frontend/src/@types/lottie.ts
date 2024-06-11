export type LayerInfo = {
  name: string;
  shapes: Array<Record<string, any>>;
};

export type Shape = {
  ty: string;
  nm: string;
  it: Shape[];
} & Record<string, any>;
