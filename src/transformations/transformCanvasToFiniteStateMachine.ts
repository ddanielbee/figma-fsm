import { FigmaNode } from "../types";

export interface FiniteStateMachineObject {
  id: string;
  initial: string;
  states: StatesObject;
}

interface StatesObject {
  [key: string]: {
    on: EventsObject;
  };
}

interface EventsObject {
  [key: string]: string;
}

const findNodeNameById = (nodes: ReadonlyArray<FigmaNode>, id: string): string => {
  const foundNode = nodes.find(node => node.id === id);
  if (foundNode) {
    return foundNode.name;
  }
  return "";
};

const hasChildWithTransition = (node: FigmaNode) =>
  node.children && node.children.some(childNode => childNode.transitionNodeID !== undefined);

const hasTransitionNodeId = (node: FigmaNode) => node.transitionNodeID !== undefined;

const buildEventsObject = (
  currentNode: FigmaNode,
  index: number,
  canvasChildren: ReadonlyArray<FigmaNode>
) => {
  if (currentNode.transitionNodeID) {
    const eventsObject: EventsObject = {};
    eventsObject[`EVENT${index + 1}`] = findNodeNameById(
      canvasChildren,
      currentNode.transitionNodeID
    );
    return eventsObject;
  }
  return {};
};

const buildStateObject = (currentNode: FigmaNode, canvasChildren: ReadonlyArray<FigmaNode>) => {
  if (currentNode.children) {
    const stateObject: StatesObject = {};
    stateObject[currentNode.name] = {
      on: currentNode.children
        .filter(hasTransitionNodeId)
        .reduce(
          (acc, cur, index) => ({ ...acc, ...buildEventsObject(cur, index, canvasChildren) }),
          {}
        )
    };
    return stateObject;
  }
  return {};
};

export const transformCanvastoFiniteStateMachine = ({
  name,
  children,
  prototypeStartNodeID
}: FigmaNode): FiniteStateMachineObject | null => {
  if (!prototypeStartNodeID || !children) {
    return null;
  }
  const initial = findNodeNameById(children, prototypeStartNodeID);
  const states = children
    .filter(hasChildWithTransition)
    .reduce(
      (acc, currentNode: FigmaNode) => ({ ...acc, ...buildStateObject(currentNode, children) }),
      {}
    );
  return { id: name, initial, states };
};
