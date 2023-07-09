import {
    engine,
    Transform,
    GltfContainer,  
    AvatarShape} from '@dcl/sdk/ecs'
  
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math';
import * as utils from '@dcl-sdk/utils' 
import { WearableBodyShape } from './definitions';
import { godParent } from './resources';

export function oceanFinish() {
  addOceanFinish();
}


function addOceanFinish() {
  const oceanFinish = engine.addEntity();
  GltfContainer.create(oceanFinish,
    {
      src: "models/oceanFinish/oceanFinish.glb"
    })

  Transform.create(oceanFinish, {
    
    parent: godParent
  })

  const oceanFinishCollider = engine.addEntity();
  GltfContainer.create(oceanFinishCollider,
    {
      src: "models/oceanFinish/oceanFinishCollider.glb"
    })

  Transform.create(oceanFinishCollider, {
    
    parent: godParent
  })

  const oceanWaterAnim = engine.addEntity();
  GltfContainer.create(oceanWaterAnim,
    {
      src: "models/oceanFinish/oceanWaterAnim.glb"
    })

  Transform.create(oceanWaterAnim, {
    
    parent: godParent
  })

  const waveAnim00 = engine.addEntity();
  GltfContainer.create(waveAnim00,
    {
      src: "models/oceanFinish/WaveAnim00.glb"
    })

  Transform.create(waveAnim00, {
    
    parent: godParent
  })

  const waveAnim01 = engine.addEntity();
  GltfContainer.create(waveAnim01,
    {
      src: "models/oceanFinish/WaveAnim01.glb"
    })

  Transform.create(waveAnim01, {
    
    parent: godParent
  })
}
  

export function addTeam() {
  const hayabusaWearables = [
    'urn:decentraland:matic:collections-v2:0x9889b023641eab84d0831d21ea89184eba6c1c16:0',
    'urn:decentraland:matic:collections-v2:0x8103ed8b1140189a2703760fda37063d5f8259f3:0',
    'urn:decentraland:matic:collections-v2:0x64435b6a89cc08904995622cf4e32e3d98a15e97:0',
    'urn:decentraland:matic:collections-v2:0x071a1f28ac0b922cd4b43fa241da56c0cf3e53a3:0',
    'urn:decentraland:matic:collections-v2:0x9d9b55db299c46e5118675361d4a5a2ba49b54b6:13',
    'urn:decentraland:matic:collections-v2:0xda5c138783a6acd76eec5ddb68aa87e6ee96a88d:3',
    'urn:decentraland:matic:collections-v2:0x122cc40fd82e277193cc02e8df4a9dc84ceece93:0'
  ]
  const joshWearables = [
    'urn:decentraland:matic:collections-v2:0xcdd8ec9d95293bb4f90ef8710dd93e53790c4193:0',
    'urn:decentraland:matic:collections-v2:0x183a4abb4350af37cb554f827333d623fdd4b053:0',
    'urn:decentraland:matic:collections-v2:0xfc5bb739f7dd92ac9c5389fda24af3a25e440a21:0',
    'urn:decentraland:matic:collections-v2:0x5b2d60db65d80593bd5c5d36fcd99717ef03e850:24',
    'urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:1',
    'urn:decentraland:matic:collections-v2:0xe3ea740d786c2eb785ea9fb5a089e3924342a4eb:1'
  ]

  
  spawnAvatar('srJH', 
    WearableBodyShape.MALE, 
    '#3f4059',
    '#cf9b7a',
    '#3f4059',
    joshWearables,
    Vector3.create(79, 9.65, 92.5))

  spawnAvatar('Hayabusa', 
    WearableBodyShape.FEMALE, 
    '#3f4059',
    '#cf9b7a',
    '#3f4059',
    hayabusaWearables,
    Vector3.create(78.5, 9.75, 91.8))
    
} 

function spawnAvatar(name: string, bodyShape: string, hairColor: string, skinColor: string, eyeColor: string, wearables: string[], position: Vector3){
  const avatar = engine.addEntity()
    AvatarShape.create(avatar, {
      id: name,
      name: name,
      bodyShape: bodyShape,
      hairColor: Color3.fromHexString(hairColor??''),
      eyeColor: Color3.fromHexString(eyeColor??''),
      skinColor:  Color3.fromHexString(skinColor??''),   
      emotes : ["clap"],
      wearables: wearables,
      expressionTriggerId: "clap",
      expressionTriggerTimestamp: Math.round(+new Date() / 1000)
    }) 

  Transform.create(avatar, {
    position: position,
    scale: Vector3.create(1,1,1),
    rotation: Quaternion.fromEulerDegrees(0, -70, 0)
  })

  doAction(avatar)
}

function doAction(shape: any) {
  const rand = Math.floor(Math.random()*830 + 2000)

  const action = ['clap', 'handsair', 'kiss']

  const randomAction = Math.floor(Math.random() * action.length);
 

  utils.timers.setTimeout(() => {

    let npc = AvatarShape.getMutable(shape);
    npc.expressionTriggerId = action[randomAction];
    npc.expressionTriggerTimestamp = Date.now()
    doAction(shape)
  }, rand)
}


