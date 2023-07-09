import {
    engine,
    Transform,
    GltfContainer,
    ColliderLayer
  } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math';
import { godParent } from './resources';

export function fallTubes() {
    addFallTubes();
}
  
function addFallTubes() {
  const fallTubes = engine.addEntity();
  GltfContainer.create(fallTubes,
    {
    src: "models/fallTubes/fallTubes.glb",
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  Transform.create(fallTubes, {
      position: Vector3.create(0, 1, 0),
      parent: godParent
  })
}
  