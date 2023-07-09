import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { godParent } from "./resources";

export function cylinderMaze() {
    addCylinderMaze();
}

function addCylinderMaze() {
   
    const cylinderMazeInner = engine.addEntity();
    GltfContainer.create(cylinderMazeInner,
        {
        src: "models/cylinderMaze/cylinderMazeInner.glb",
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
	    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    Transform.create(cylinderMazeInner, {
        position: Vector3.create(0, 0, 0),
        parent: godParent
    })
   
    const cylinderMazeOuter = engine.addEntity();
    GltfContainer.create(cylinderMazeOuter,
    {
        src: "models/cylinderMaze/cylinderMazeOuter.glb",
    })

    Transform.create(cylinderMazeOuter, {
        position: Vector3.create(0, 0, 0),
        parent: godParent
    }) 

    const cap = engine.addEntity();
    GltfContainer.create(cap,
    {
        src: "models/cylinderMaze/cap.glb",
    })

    Transform.create(cap, {
        position: Vector3.create(0, 0, 0),
        parent: godParent
    }) 
}
  