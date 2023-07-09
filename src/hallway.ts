import {
    engine,
    Transform,
    GltfContainer,  
    AudioSource} from '@dcl/sdk/ecs'
  
import { Vector3, Quaternion } from '@dcl/sdk/math';
import { addTransporter, cryManSound, godParent, underwaterSound } from './resources';
import * as utils from '@dcl-sdk/utils' 

export function hallway() {
  addHallway();
}

function addHallway() {
  const hallway = engine.addEntity();
  GltfContainer.create(hallway,
    {
      src: "models/hallWay/hallwayOfDoors.glb"
    })

  Transform.create(hallway, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: godParent
  })

  const hallLight00 = engine.addEntity();
  GltfContainer.create(hallLight00,
    {
      src: "models/hallWay/hallLight00.glb"
    })

  Transform.create(hallLight00, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: godParent
  })
  
  const hallLight01 = engine.addEntity();
  GltfContainer.create(hallLight01,
    {
      src: "models/hallWay/hallLight01.glb"
    })

  Transform.create(hallLight01, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: godParent
  })

  const hallLight02 = engine.addEntity();
  GltfContainer.create(hallLight02,
    {
      src: "models/hallWay/hallLight02.glb"
    })

  Transform.create(hallLight02, {
    parent: godParent
  })

  addTransporter(Vector3.create(53, 17.66, 64.7),  Vector3.create(19.01, 34.62, 63.1), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {
      utils.timers.setTimeout(()=> {
        Transform.getMutable(underwaterSound).position = Transform.get(engine.PlayerEntity).position
        AudioSource.getMutable(underwaterSound).playing = true
        AudioSource.getMutable(underwaterSound).loop = true
      }, 800)
    
  }) //underwater
  addTransporter(Vector3.create(53, 17.82, 74.81), Vector3.create(55.09, 3, 53.76), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {}) //interrogation room
  addTransporter(Vector3.create(53, 17.74, 53.33), Vector3.create(38.11, 11.17, 43.69), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {}) // grassy corridor
  addTransporter(Vector3.create(56.8, 17.74, 64.42), Vector3.create(55.98, 1, 30.47), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {}) //flybox
  addTransporter(Vector3.create(55, 17.74, 47.2), Vector3.create(55.26, 20, 79.07), Quaternion.fromEulerDegrees(0, 180, 0), ()=> {}) //start
}
  