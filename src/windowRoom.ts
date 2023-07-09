import {
    engine,
    Transform,
    GltfContainer,  
    Material,
    MeshRenderer,
    pointerEventsSystem,
    InputAction,
    MeshCollider,
    AudioSource} from '@dcl/sdk/ecs'
  
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math';
import { godParent, waveSound } from './resources';
import * as utils from '@dcl-sdk/utils' 
import { movePlayerTo } from '~system/RestrictedActions';
import { addTeam } from './oceanFinish';
export function windowRoom() {
  addWindowRoom();
}
  
function addWindowRoom() {
  const windowRoom = engine.addEntity();
  GltfContainer.create(windowRoom,
    {
      src: "models/windowRoom/windowRoom.glb"
    })

  Transform.create(windowRoom, {
    position: Vector3.create(0, 1.7, 0 ),
    parent: godParent
  })

  const windowRoomCollider = engine.addEntity();
  GltfContainer.create(windowRoomCollider,
    {
      src: "models/windowRoom/windowRoomCollider.glb"
    })

  Transform.create(windowRoomCollider, {
    position: Vector3.create(0, 1.7, 0 ),
    parent: godParent
  })

  

  
  const box = engine.addEntity();
  Transform.create(box, { 
    position: {x: 52.7, y: 3, z: 42.3} ,
    scale: Vector3.create(1,2,1)
  })
  Material.setPbrMaterial(box, { albedoColor: Color4.Clear() , castShadows: false})
  

  MeshRenderer.setBox(box)
  
  let timerId: number;
  utils.triggers.addTrigger(box, utils.NO_LAYERS, utils.LAYER_1, [{type: 'box'}], function(otherEntity) {
    timerId = utils.timers.setTimeout(()=> {

      movePlayerTo({newRelativePosition: Vector3.create(77.81, 4.8, 76.63)  })
      
      Transform.getMutable(waveSound).position = Vector3.create(79.1, 9.65, 92.5) 
      AudioSource.getMutable(waveSound).playing = true
      AudioSource.getMutable(waveSound).loop = true
      addTeam()
    }, 10000)
  }, ()=>{
    utils.timers.clearTimeout(timerId);
  })

  addClickableWindow();
}

function addClickableWindow() {
  const clickableBox = engine.addEntity()
  MeshRenderer.setBox(clickableBox)
  MeshCollider.setBox(clickableBox)
  
  Transform.create(clickableBox, { 
      position: Vector3.create(57.7, 4, 36.23),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(1.5,1.5,1.5)
  })

  Material.setPbrMaterial(clickableBox, { albedoColor: Color4.Clear() , castShadows: false})

  pointerEventsSystem.onPointerDown(
    {
      entity: clickableBox, opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Give up and start again!'
      }
    }
    ,
    function () {
      movePlayerTo({newRelativePosition: Vector3.create(88.65 , 190, 43.3) })
    }
  )
  
} 

  