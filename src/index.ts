import { FiniteStateMachineObject } from "./transformations/transformCanvasToFiniteStateMachine";
import { getFigmaFile } from "./requests/getFigmaFile";
import { transformFileToFiniteStateMachines } from "./transformations/transformFileToFiniteStateMachines";

export const figmaPrototypesToFiniteStateMachines = async (
  token: string,
  fileKey: string
): Promise<ReadonlyArray<FiniteStateMachineObject | null>> => {
  const fileData = await getFigmaFile(token, fileKey);
  return transformFileToFiniteStateMachines(fileData);
};
