import {
    engine,
    Transform,
    GltfContainer,
    AudioSource} from '@dcl/sdk/ecs'
  
import { Vector3, Color3 } from '@dcl/sdk/math';
import { coinPickupSound, fairySound, godParent } from './resources';
import { movePlayerTo } from '~system/RestrictedActions';
import * as utils from '@dcl-sdk/utils'  
  
export function tightValley() {
  addTightValley();
}

function addTightValley() {
   
  const tightValley = engine.addEntity();
  GltfContainer.create(tightValley,
    {
      src: "models/tightValley/tightValley.glb"
    })

  Transform.create(tightValley, {
    parent: godParent
  })

  const heart = engine.addEntity()
      GltfContainer.create(heart, { src: 'models/cylinderMaze/heartKey.glb' })
      Transform.create(heart, { 
          position: Vector3.create(38.3, 15.4, 102.69)
      })

  utils.triggers.addTrigger(
    heart,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
        
      Transform.getMutable(coinPickupSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(coinPickupSound).playing = true
      AudioSource.getMutable(fairySound).playing = true
      movePlayerTo({newRelativePosition: Vector3.create(40, 140, 100) })
            
    }, undefined, Color3.Yellow())
  
}
