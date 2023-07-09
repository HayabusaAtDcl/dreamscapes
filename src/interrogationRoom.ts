import {
    engine,
    Transform,
    GltfContainer,  
    executeTask,
    AvatarShape,
    AudioSource,
} from '@dcl/sdk/ecs'
    import * as utils from '@dcl-sdk/utils' 
import { Vector3, Quaternion, Color3 } from '@dcl/sdk/math';
import { addTransporter, cryManSound, cryWomanSound, godParent } from './resources';
import { getUserData } from '~system/UserIdentity';
import { WearableBodyShape } from './definitions';
export function interrogationRoom() {
  addInterrogationRoom();
}
  
function addInterrogationRoom() {
  const interrogationRoom = engine.addEntity();
  GltfContainer.create(interrogationRoom,
    {
      src: "models/interagationRoom/interagationRoom.glb"
    })

  Transform.create(interrogationRoom, {
    position: Vector3.create(0, 2, 0 ),
    parent: godParent
  })


  executeTask(async () => {
    let userData = await getUserData({})

    const myTwin = engine.addEntity()
    AvatarShape.create(myTwin, {
      id: " ",
      name: userData.data?.displayName,
      bodyShape: userData.data?.avatar?.bodyShape,
      hairColor: Color3.fromHexString(userData.data?.avatar?.hairColor??''),
      eyeColor: Color3.fromHexString(userData.data?.avatar?.eyeColor??''),
      skinColor:  Color3.fromHexString(userData.data?.avatar?.skinColor??''),   
      emotes : ["idle"],
      wearables: userData.data?.avatar?.wearables??[],
      expressionTriggerId: "idle",
      expressionTriggerTimestamp: Math.round(+new Date() / 1000)
    }) 

    Transform.create(myTwin, {
      position: Vector3.create(59.95, 2.2, 49.81),
      rotation: Quaternion.fromEulerDegrees(0, 130, 0)
    })

    addTransporter(Vector3.create(55.48, 3, 46.5),  Vector3.create(27.26, 12, 90.84), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {}) //command center
    
    utils.timers.setInterval(function () {
      const npc = AvatarShape.getMutable(myTwin);
    
      npc.emotes = ["cry"]
      npc.expressionTriggerId = "cry"
      npc.expressionTriggerTimestamp = Math.round(+new Date() / 1000)
      const playerPosition = Transform.get(engine.PlayerEntity).position
      const playerInRoom = playerPosition.x >= 50 && playerPosition.x <= 58 
      && playerPosition.z >= 48 && playerPosition.z <= 56;
     
      if (playerInRoom) {
        if (npc.bodyShape == WearableBodyShape.FEMALE) {
          Transform.getMutable(cryWomanSound).position = Transform.get(engine.PlayerEntity).position
          AudioSource.getMutable(cryWomanSound).playing = true
        } else {
          Transform.getMutable(cryManSound).position = Transform.get(engine.PlayerEntity).position
          AudioSource.getMutable(cryManSound).playing = true
        } 
      }
      
    }, 8000)
  })
  
}
  