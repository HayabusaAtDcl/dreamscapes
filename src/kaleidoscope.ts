import {
    engine,
    Transform,
    GltfContainer,
    ColliderLayer} from '@dcl/sdk/ecs'
  
import { godParent } from './resources';

export function kaleidoscopeWheel() {
    addKaleidoscopeWheel();
 }

function addKaleidoscopeWheel() {
   
  const kaleidoscopeWheel = engine.addEntity();
  GltfContainer.create(kaleidoscopeWheel,
    {
      src: "models/kaleidoscopeWheel/kaleidoscopeWheel.glb",
      invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

  Transform.create(kaleidoscopeWheel, {
    parent: godParent
  })

  const kaleidoscopeWheelCollider = engine.addEntity();
  GltfContainer.create(kaleidoscopeWheelCollider,
    {
      src: "models/kaleidoscopeWheel/kaleidoscopeWheelCollider.glb",
      invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

  Transform.create(kaleidoscopeWheelCollider, {
    parent: godParent
  })

  const extraColliders = engine.addEntity();
  GltfContainer.create(extraColliders,
    {
      src: "models/extras/extraColliders.glb"
    })

  Transform.create(extraColliders, {
    parent: godParent
  })


}
  