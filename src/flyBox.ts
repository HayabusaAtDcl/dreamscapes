import {
    engine,
    Transform,
    GltfContainer, 
    Material,
    MeshCollider,
    MeshRenderer} from '@dcl/sdk/ecs'
  
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import { addTeleportSphere, godParent } from './resources';
import * as utils from '@dcl-sdk/utils'   
import { movePlayerTo } from '~system/RestrictedActions';
export function flyBox() {
  addFlyBox();
}
  
function addFlyBox() {
    
  const flyBox = engine.addEntity();
  GltfContainer.create(flyBox,
    {
      src: "models/flyBox/flyBox.glb"
    })

  Transform.create(flyBox, {
    position: Vector3.create(0, 0.5, 0),
    parent: godParent
  })

  addSlowRise()

  function addSlowRise()  {
    const floor = engine.addEntity()
    Transform.create(floor, {
      position: Vector3.create(57.7, .7, 25.65),
      scale: Vector3.create(2,2,2),
      rotation: Quaternion.fromEulerDegrees(90, 0, 0), 
      
    })
    MeshRenderer.setPlane(floor)
    MeshCollider.setPlane(floor)
    Material.setPbrMaterial(floor, { albedoColor: Color4.Clear() , castShadows: false})
    let playerOnArea = false;
    utils.triggers.addTrigger(floor, utils.NO_LAYERS, utils.LAYER_1, [{type: 'box'}], function(otherEntity) {
      playerOnArea = true
    }, ()=> {
      playerOnArea = false
    })
  
    function slowRise() {
     
      let transform = Transform.getMutable(floor)
      if (playerOnArea)  {
        
        transform.position = Vector3.add(transform.position, Vector3.scale(Vector3.Up(), 0.08))
    
        if (transform.position.y > 12) {
          movePlayerTo({newRelativePosition:  Vector3.create(54.95, 3, 41.42) }) //windows room
        } 
      } else {
        transform.position.y = 0.7
      }
    }
    engine.addSystem(slowRise) 
    return slowRise;
  }
}
  