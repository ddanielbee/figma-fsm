import { FigmaFile } from "../types";

import {
  FiniteStateMachineObject,
  transformCanvastoFiniteStateMachine
} from "./transformCanvasToFiniteStateMachine";

export const transformFileToFiniteStateMachines = (
  prototypesFile: FigmaFile
): ReadonlyArray<FiniteStateMachineObject | null> =>
  prototypesFile.document.children
    .map(transformCanvastoFiniteStateMachine)
    .filter(fsm => fsm !== null);
