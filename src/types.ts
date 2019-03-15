export interface FigmaFile {
  readonly lastModified: string;
  readonly thumbnailUrl: string;
  readonly version: string;
  readonly document: FigmaDocument;
  readonly components: {};
  readonly schemaVersion: 0;
  readonly styles: {};
  readonly name: string;
}

export interface FigmaGlobal {
  readonly id: string;
  readonly name: string;
  readonly visible?: boolean;
  readonly children?: ReadonlyArray<FigmaNode>;
  readonly type: NodeType;
  readonly prototypeStartNodeID?: string | null;
  readonly transitionNodeID?: string;
}

export type NodeType =
  | "DOCUMENT"
  | "CANVAS"
  | "FRAME"
  | "GROUP"
  | "VECTOR"
  | "BOOLEAN"
  | "STAR"
  | "LINE"
  | "ELLIPSE"
  | "REGULAR_POLYGON"
  | "RECTANGLE"
  | "TEXT"
  | "SLICE"
  | "COMPONENT"
  | "INSTANCE";

export type FigmaNode =
  | FigmaDocument
  | FigmaCanvas
  | FigmaFrame
  | FigmaGroup
  | Vector
  | BooleanGroup
  | Star
  | Line
  | Ellipse
  | RegularPolygon
  | Rectangle
  | Text
  | Slice
  | Component
  | Instance;

export interface FigmaDocument extends FigmaGlobal {
  readonly type: "DOCUMENT";
  readonly children: ReadonlyArray<FigmaNode>;
}

export interface FigmaCanvas extends FigmaGlobal {
  readonly type: "CANVAS";
  readonly children: ReadonlyArray<FigmaNode>;
  readonly backgroundColor: Color;
  readonly exportSettings?: ReadonlyArray<ExportSetting>;
}

export interface FrameBase extends FigmaGlobal {
  readonly children: ReadonlyArray<FigmaNode>;
  readonly background?: ReadonlyArray<Paint>;
  readonly backgroundColor: Color;
  readonly exportSettings?: ReadonlyArray<ExportSetting>;
  readonly blendMode: BlendMode;
  readonly preserveRatio?: boolean;
  readonly constraints: LayoutConstraint;
  readonly transitionNodeID?: string | null;
  readonly transitionDuration?: number | null;
  readonly transitionEasing?: EasingType | null;
  readonly opacity?: number;
  readonly absoluteBoundingBox: Rect;
  readonly size?: Vector2;
  readonly relativeTransform?: Transform;
  readonly clipsContent: boolean;
  readonly layoutGrids?: ReadonlyArray<LayoutGrid>;
  readonly effects: ReadonlyArray<Effect>;
  readonly isMask?: boolean;
}

export interface FigmaFrame extends FrameBase {
  readonly type: "FRAME";
}

export interface FigmaGroup extends FrameBase {
  readonly type: "GROUP";
}

export interface VectorBase extends FigmaGlobal {
  readonly exportSettings?: ReadonlyArray<ExportSetting>;
  readonly blendMode: BlendMode;
  readonly preserveRatio?: boolean;
  readonly constraints: LayoutConstraint;
  readonly transitionNodeID?: string | null;
  readonly transitionDuration?: number | null;
  readonly transitionEasing?: EasingType | null;
  readonly opacity?: number;
  readonly absoluteBoundingBox: Rect;
  readonly size?: Vector2;
  readonly relativeTransform?: Transform;
  readonly effects: ReadonlyArray<Effect>;
  readonly isMask?: boolean;
  readonly fills: ReadonlyArray<Paint>;
  readonly fillGeometry?: ReadonlyArray<Path>;
  readonly strokes: ReadonlyArray<Paint>;
  readonly strokeWeight: number;
  readonly strokeGeometry?: ReadonlyArray<Path>;
  readonly strokeAlign: "INSIDE" | "OUTSIDE" | "CENTER";
}

export interface Vector extends VectorBase {
  readonly type: "VECTOR";
}

export interface BooleanGroup extends VectorBase {
  readonly type: "BOOLEAN";
  readonly booleanOperation: "UNION" | "INTERSECT" | "SUBTRACT" | "EXCLUDE";
  readonly children: ReadonlyArray<FigmaNode>;
}

export interface Star extends VectorBase {
  readonly type: "STAR";
}

export interface Line extends VectorBase {
  readonly type: "LINE";
}

export interface Ellipse extends VectorBase {
  readonly type: "ELLIPSE";
}

export interface RegularPolygon extends VectorBase {
  readonly type: "REGULAR_POLYGON";
}

export interface Rectangle extends VectorBase {
  readonly type: "RECTANGLE";

  readonly cornerRadius?: number;
}

export interface Text extends VectorBase {
  readonly type: "TEXT";
  readonly characters: string;
  readonly style: TypeStyle;
  readonly characterStyleOverrides: ReadonlyArray<number>;
  readonly styleOverrideTable: { readonly [index: number]: TypeStyle };
}

export interface Slice extends FigmaGlobal {
  readonly type: "SLICE";
  readonly exportSettings: ReadonlyArray<ExportSetting>;
  readonly absoluteBoundingBox: Rect;
  readonly size?: Vector2;
  readonly relativeTransform?: Transform;
}

export interface Component extends FrameBase {
  readonly type: "COMPONENT";
}

export interface Instance extends FrameBase {
  readonly type: "INSTANCE";
  readonly componentId: string;
}

// Types

export interface Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

export interface ExportSetting {
  readonly suffix: string;
  readonly format: "JPG" | "PNG" | "SVG";
  readonly constraint: Constraint;
}

export interface Constraint {
  readonly type: "SCALE" | "WIDTH" | "HEIGHT";
  readonly value: number;
}

export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

type BlendMode = string;

type EasingType = string;

export interface LayoutConstraint {
  readonly vertical: "TOP" | "BOTTOM" | "CENTER" | "TOP_BOTTOM" | "SCALE";
  readonly horizontal: "LEFT" | "RIGHT" | "CENTER" | "LEFT_RIGHT" | "SCALE";
}

export interface LayoutGrid {
  readonly pattern: "COLUMNS" | "ROWS" | "GRID";
  readonly sectionSize: number;
  readonly visible: boolean;
  readonly color: Color;
  readonly alignment: "MIN" | "MAX" | "CENTER";
  readonly gutterSize: number;
  readonly offset: number;
  readonly count: number;
}

export interface Effect {
  readonly type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR";
  readonly visible: boolean;
  readonly radius: number;
  readonly color?: Color;
  readonly blendMode?: BlendMode;
  readonly offset?: Vector2;
}

export interface Paint {
  readonly type:
    | "SOLID"
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_ANGULAR"
    | "GRADIENT_DIAMOND"
    | "IMAGE"
    | "EMOJI";
  readonly visible?: boolean;
  readonly opacity?: number;
  readonly color?: Color;
  readonly gradientHandlePositions?: ReadonlyArray<Vector2>;
  readonly gradientStops?: ReadonlyArray<ColorStop>;
  readonly scaleMode?: string;
  readonly blendMode?: BlendMode;
}

export interface Path {
  readonly path: string;
  readonly windingRule: "EVENODD" | "NONZERO";
}

export type Transform = ReadonlyArray<ReadonlyArray<number>>;

export interface Vector2 {
  readonly x: number;
  readonly y: number;
}

export interface ColorStop {
  readonly position: number;
  readonly color: Color;
}

export interface TypeStyle {
  readonly fontFamily: string;
  readonly fontPostScriptName: string;
  readonly italic?: boolean;
  readonly fontWeight: number;
  readonly fontSize: number;
  readonly textAlignHorizontal: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFIED";
  readonly textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  readonly letterSpacing: number;
  readonly fills?: ReadonlyArray<Paint>;
  readonly lineHeightPx: number;
  readonly lineHeightPercent: number;
}

export interface Component {
  readonly key: string;
  readonly name: string;
  readonly description: string;
}

export interface Style {
  readonly name: string;
  readonly key: string;
  readonly styleType: "FILL" | "TEXT" | "EFFECT" | "GRID";
}
