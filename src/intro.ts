import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  InputAction,
  GltfContainer,
  Material,
  pointerEventsSystem,
  AudioSource} from '@dcl/sdk/ecs'

import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math';
import { movePlayerTo } from '~system/RestrictedActions';

import { setupPickableItems } from './pickups';
import { dropSound, fairySound, godParent } from './resources';
import * as utils from '@dcl-sdk/utils' 
export function dreamScape() {
  addIntro();
}

function addIntro() {
  
  const mainIntro = engine.addEntity();
  GltfContainer.create(mainIntro,
    {
      src: "models/intro/intro.glb"
    })

  Transform.create(mainIntro, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: godParent
  })

  const outerIntro = engine.addEntity();
  GltfContainer.create(outerIntro,
    {
      src: "models/intro/introBackgroundAnim.glb"
    })

  Transform.create(outerIntro, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: godParent
  })
 
  const door = engine.addEntity();
  MeshRenderer.setBox(door)
  MeshCollider.setBox(door)
  Transform.create(door, {
    position: Vector3.create(-85.3, 17.9, -36),
    rotation: Quaternion.fromEulerDegrees(-70, -60, 40),
    parent: mainIntro
  })

  Material.setPbrMaterial(door, {
    albedoColor: Color4.Clear()
  }) 

  // Contains the positions for each sparkle
  const sparklePositions = [
    Vector3.create(82.35, 20, 45.72),
    Vector3.create(87.48, 21, 46.52),
    Vector3.create(86.7, 19, 44.7)
  ]

  setupPickableItems('models/extras/sparkle.glb', sparklePositions, Quaternion.fromEulerDegrees(0, 0, 0),
  () => {
    pointerEventsSystem.onPointerDown(
      {
        entity: door, opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'You have enough sparkles!'
        }
      }
      ,
      function () {
    
        const slowDrop = addSlowDrop();
        const sparklePositions = [
          Vector3.create(42.3,23, 22)
        ]

        setupPickableItems('models/cylinderMaze/heartKey.glb', sparklePositions, Quaternion.fromEulerDegrees(90, 0, 0), () => {
          engine.removeSystem(slowDrop)
          AudioSource.getMutable(dropSound).playing = false
          movePlayerTo({newRelativePosition: Vector3.create(30, 12, 32.11) })

          utils.timers.setTimeout(()=> {
            Transform.getMutable(fairySound).position = Transform.get(engine.PlayerEntity).position
            AudioSource.getMutable(fairySound).playing = true
            AudioSource.getMutable(fairySound).loop = true
            
          }, 800)

        })

        movePlayerTo({newRelativePosition: Vector3.create(42,111, 18) })

        
        Transform.getMutable(dropSound).position = Vector3.create(42,111, 18)
        AudioSource.getMutable(dropSound).playing = true
       

      }
    )
  }) 

}

function addSlowDrop()  {
  const floor = engine.addEntity()
  Transform.create(floor, {
    position: Vector3.create(42, 50, 20),
    scale: Vector3.create(12,12,12),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0), 
  })
  MeshRenderer.setPlane(floor)
  MeshCollider.setPlane(floor)
  Material.setPbrMaterial(floor, { albedoColor: Color4.Clear() , castShadows: false})

  function slowDrop() {
    let transform = Transform.getMutable(floor)
    transform.position = Vector3.add(transform.position, Vector3.scale(Vector3.Down(), 2))

    if (transform.position.y < 4) {
      transform.position.x = transform.position.x,
      transform.position.y = 50
      transform.position.z = transform.position.z

      movePlayerTo({
        newRelativePosition: Vector3.create(transform.position.x,55,transform.position.z)
      })
    }
  }
  engine.addSystem(slowDrop) 
  return slowDrop;
}
