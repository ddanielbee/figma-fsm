import { FigmaFile } from "../types";
import { FiniteStateMachineObject } from "./transformCanvasToFiniteStateMachine";
export declare const transformFileToFiniteStateMachines: (prototypesFile: FigmaFile) => ReadonlyArray<FiniteStateMachineObject | null>;
