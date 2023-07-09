import {
    engine,
    Transform,
    GltfContainer,  
    ColliderLayer} from '@dcl/sdk/ecs'
  
import { godParent } from './resources';
 
export function commandCenter() {
  addCommandCenter();
}
  
function addCommandCenter() {
  
  const commandCenter = engine.addEntity();
  GltfContainer.create(commandCenter,
    {
      src: "models/commandCenter/commandCenter.glb",
      visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    })
  
  Transform.create(commandCenter, {
    parent: godParent
  })

  const chairAnim = engine.addEntity();
  GltfContainer.create(chairAnim,
    {
      src: "models/commandCenter/chairAnim.glb"
    })

  Transform.create(chairAnim, {
    parent: godParent
  })

  const portalAnim00 = engine.addEntity();
  GltfContainer.create(portalAnim00,
    {
      src: "models/commandCenter/portalAnim00.glb"
    })

  Transform.create(portalAnim00, {
    parent: godParent
  })

  const portalAnim01 = engine.addEntity();
  GltfContainer.create(portalAnim01,
    {
      src: "models/commandCenter/portalAnim01.glb"
    })

  Transform.create(portalAnim01, {
    parent: godParent
  })
  
}
  