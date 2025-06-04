import {useCallback} from 'react'

import {
    ReactFlowProvider,
    ReactFlow,
    Background,
    Panel,

    BackgroundVariant,

    type NodeChange,
    type EdgeChange,
    type Connection,

    applyNodeChanges,
    applyEdgeChanges,

    addEdge,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import FPSCounter from "@/components/FPSCounter.tsx";
import Node from "@/components/Node.tsx";

import {
    useGraph,
    useRefCallback
} from "@/hooks";

import {
    type NodeType,
    type EdgeType, type NodeData
} from "@/schemas";

import {
    createRandomDictionary
} from "@/utils";



const NODE_TYPES = {custom: Node}// лучше так, что бы создние нового объекта в ренедере не вызывало обнорвлений всего древа

function App() {

    const {
        nodes,
        edges,
        setNodes,
        setEdges
    } = useGraph();

    const onConnect = useRefCallback(
        (connection: Connection) => {
            const newEdges = addEdge<EdgeType>(connection, edges);

            const sourceNode = nodes.find(node => node.id === connection.source);
            const targetNode = nodes.find(node => node.id === connection.target);

            if (!sourceNode || !targetNode) {
                console.error("Source or target node not found for connection:", connection);
                return;
            }

            const sourceNodeData = sourceNode.data as NodeData;
            const targetNodeData = targetNode.data as NodeData;

            const newNode: NodeType = {
                id: connection.target,
                position: targetNode.position,
                type: "custom",
                data: {
                    displayName: targetNodeData.displayName,
                    values: {
                        ...sourceNodeData.values,
                        ...targetNodeData.values
                    }
                }
            }

            setNodes(nodes.map(node =>
                node.id === newNode.id ? newNode : node
            ));

            setEdges(newEdges);

        }
    );

    const onNodesChangeInternal = useRefCallback((changes: NodeChange<NodeType>[]) => {
        const changedNodes = applyNodeChanges(changes, nodes);
        setNodes(changedNodes);
    });

    const onEdgesChangeInternal = useRefCallback((changes: EdgeChange<EdgeType>[]) => {
        const changedEdges = applyEdgeChanges(changes, edges);
        setEdges(changedEdges);
    });

    const addNode = useRefCallback(() => {// вовсе не обязателен, так как используется в HTML Button, но не критично
        const newNode: NodeType = {
            id: (nodes.length + 1).toString(),
            position: {x: Math.random() * 400, y: Math.random() * 400},
            type: "custom",
            data: {
                displayName: `Node ${nodes.length + 1}`,
                values: createRandomDictionary(2)
            }
        };
        setNodes([...nodes, newNode]);
    });

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh'
            }}
        >
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChangeInternal}
                    onEdgesChange={onEdgesChangeInternal}
                    onConnect={onConnect}
                    nodeTypes={NODE_TYPES}//вот это это сразу не заметил - nodeTypes={{custom: Node}}
                    deleteKeyCode={"Delete"}
                    onlyRenderVisibleElements
                >
                    <Panel>
                        <FPSCounter/>
                        <button onClick={addNode}>Add Node</button>
                    </Panel>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    )
}

export default App;
