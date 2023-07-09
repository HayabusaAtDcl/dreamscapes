import {
    engine,
    Transform,
    GltfContainer,  
    MeshRenderer,
    Material} from '@dcl/sdk/ecs'
  
import { godParent } from './resources';
import { Color3, Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import * as utils from '@dcl-sdk/utils'    
import { movePlayerTo } from '~system/RestrictedActions';
export function rabbitHoleField() {
  addRabbitHoleField();
}
  
function addRabbitHoleField() {
  const rabbitHoleField = engine.addEntity();
  GltfContainer.create(rabbitHoleField,
    {
      src: "models/rabbitHoleField/rabbitHoleField.glb"
    })

  Transform.create(rabbitHoleField, {
    parent: godParent
  })

  const rabbitHoleBG = engine.addEntity();
  GltfContainer.create(rabbitHoleBG,
    {
      src: "models/rabbitHoleField/rabbitHoleBG.glb"
    })

  Transform.create(rabbitHoleBG, {
    parent: godParent
  })

  const rabbitHoleRot = engine.addEntity();
  GltfContainer.create(rabbitHoleRot,
    {
      src: "models/rabbitHoleField/rabbitHoleRot.glb"
    })

  Transform.create(rabbitHoleRot, {
    parent: godParent
  })

  const rabbitHoleRotCollider = engine.addEntity();
  GltfContainer.create(rabbitHoleRotCollider,
    {
      src: "models/rabbitHoleField/rabbitHoleRotCollider.glb"
    })

  Transform.create(rabbitHoleRotCollider, {
    parent: godParent
  })


  /* straight tube */
  const transporter = engine.addEntity()
  MeshRenderer.setBox(transporter);
  
  Transform.create(transporter, { 
      position: Vector3.create(41.1 , 35.9, 96.82),
      rotation: Quaternion.fromEulerDegrees(90, 0, 0),
      scale: Vector3.create(1.5,1.5,1.5)
  })

  Material.setPbrMaterial(transporter, { albedoColor: Color4.Clear() , castShadows: false})

   utils.triggers.addTrigger(
    transporter,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
        
      movePlayerTo({newRelativePosition: Vector3.create(40, 140, 100) })
            
    }, undefined, Color3.Yellow()) 
}
  