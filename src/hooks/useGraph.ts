import {useAppDispatch} from "./useAppDispatch";
import {useAppSelector} from "./useAppSelector";

import {
    setNodes as setNodesAction,
    setEdges as setEdgesAction,
} from "@/store/slices/graphSlice.ts";

import {
    type NodeType,
    type EdgeType
} from "@/schemas";
import { useCallback } from "react";


export const useGraph = () => {
    const dispatch = useAppDispatch();

    const nodes = useAppSelector((state) => state.graph.nodes);
    const edges = useAppSelector((state) => state.graph.edges);

    const setNodes = useCallback((newNodes: NodeType[]) => {
        dispatch(setNodesAction(newNodes));
    }, []);

    const setEdges = useCallback((newEdges: EdgeType[]) => {
        dispatch(setEdgesAction(newEdges));
    }, []);

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
    };
}