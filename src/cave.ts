import {
    engine,
    Transform,
    GltfContainer,
    AudioSource} from '@dcl/sdk/ecs'
  
import { addTransporter, godParent, underwaterSound } from './resources';
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import * as utils from '@dcl-sdk/utils' 
export function cave() {
  addCave();
}

function addCave() {
  const cave = engine.addEntity();
  GltfContainer.create(cave,
    {
      src: "models/cave/cave.glb"
    })

  Transform.create(cave, {
    parent: godParent
  })

  const merkaba00 = engine.addEntity();
  GltfContainer.create(merkaba00,
    {
      src: "models/cave/merkaba00.glb"
    })

  Transform.create(merkaba00, {
    parent: godParent
  })

  const merkaba01 = engine.addEntity();
  GltfContainer.create(merkaba01,
    {
      src: "models/cave/merkaba01.glb"
    })

  Transform.create(merkaba01, {
    parent: godParent
  })

  addTransporter(Vector3.create(41.56 , 4.23, 92.41),  Vector3.create(42.96, 19.34, 99.88), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {})
  addTransporter(Vector3.create(36.48 , 4.19, 92.45), Vector3.create(19.01, 34.62, 63.3), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {
    utils.timers.setTimeout(()=> {
      Transform.getMutable(underwaterSound).position = Transform.get(engine.PlayerEntity).position
      AudioSource.getMutable(underwaterSound).playing = true
      AudioSource.getMutable(underwaterSound).loop = true
    }, 800)
  })
}
  