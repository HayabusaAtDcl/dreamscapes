import {
    engine,
    Transform,
    GltfContainer,
    ColliderLayer} from '@dcl/sdk/ecs'
  
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { addTransporter, godParent } from './resources';
export function spiralDoor() {
  addSpiralDoor();
}
  
function addSpiralDoor() {
  const spiralDoor = engine.addEntity();
  GltfContainer.create(spiralDoor,
    {
      src: "models/spiralDoor/spiralDoor.glb",
      visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    })

  Transform.create(spiralDoor, {
    parent: godParent
  })

  addTransporter(Vector3.create(12.72 , 9.56, 17.87), Vector3.create(55.26, 20, 79.07), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {})
  
}
  