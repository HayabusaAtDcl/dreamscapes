import {
    engine,
    Transform,
    GltfContainer,  
    ColliderLayer} from '@dcl/sdk/ecs'
  
import { godParent } from './resources';

export function grassyCorridor() {
  addGrassyCorridor();
}

function addGrassyCorridor() {
  
  const grassyCorridor = engine.addEntity();
  GltfContainer.create(grassyCorridor,
    {
      src: "models/grassyCooridor/grassyCooridor.glb",
      visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    })

  Transform.create(grassyCorridor, {
    parent: godParent
  })

  
  
}
  