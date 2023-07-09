import {
    engine,
    Transform,
    GltfContainer,
    Material,
    MeshRenderer,
    AudioSource} from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'   
import { godParent, underwaterSound } from './resources';
import { Color3, Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import { movePlayerTo } from '~system/RestrictedActions';

export function underWater() {
  addUnderWater();
}
    
function addUnderWater() {
  const underWater = engine.addEntity();
  GltfContainer.create(underWater,
    {
      src: "models/underWater/underWater.glb"
    })

  Transform.create(underWater, {
    parent: godParent
  })

  const underWaterCollider = engine.addEntity();
  GltfContainer.create(underWaterCollider,
    {
      src: "models/underWater/underWaterCollider.glb"
    })

  Transform.create(underWaterCollider, {
    parent: godParent
  })

  const bubbles = engine.addEntity();
  GltfContainer.create(bubbles,
    {
      src: "models/underWater/bubbles.glb"
    })

  Transform.create(bubbles, {
    parent: godParent
  })


  const transporter = engine.addEntity()
  MeshRenderer.setBox(transporter);
  
  Transform.create(transporter, { 
      position: Vector3.create(19.91, 35, 64.01),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(0.5,0.5,0.5)
  })

  Material.setPbrMaterial(transporter, { albedoColor: Color4.Clear() , castShadows: false})

   utils.triggers.addTrigger(
    transporter,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
     
      AudioSource.getMutable(underwaterSound).playing = false
      movePlayerTo({newRelativePosition: Vector3.create(40, 140, 100) })
    }, undefined, Color3.Yellow()) 
}
