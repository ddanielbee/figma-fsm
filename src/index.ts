import { FiniteStateMachineObject } from "./transformations/transformCanvasToFiniteStateMachine";
import { getFigmaFile } from "./requests/getFigmaFile";
import { transformFileToFiniteStateMachines } from "./transformations/transformFileToFiniteStateMachines";

export default async function figmaFSM(
  token: string,
  fileKey: string
): Promise<ReadonlyArray<FiniteStateMachineObject | null>> {
  const fileData = await getFigmaFile(token, fileKey);
  return transformFileToFiniteStateMachines(fileData);
}
