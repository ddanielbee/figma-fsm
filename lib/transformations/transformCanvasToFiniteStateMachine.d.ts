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
export declare const transformCanvastoFiniteStateMachine: ({ name, children, prototypeStartNodeID }: FigmaNode) => FiniteStateMachineObject | null;
export {};
