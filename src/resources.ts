import { engine, AudioSource, Transform, InputAction, MeshCollider, MeshRenderer, pointerEventsSystem, Material, CameraModeArea, CameraType } from "@dcl/sdk/ecs"
import { Color3, Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { MovePlayerToResponse, movePlayerTo } from "~system/RestrictedActions";
import * as utils from '@dcl-sdk/utils'  
import { spiderMovementSystem } from "./modules/spider";


export const coinPickupSound = engine.addEntity()
Transform.create(coinPickupSound)
AudioSource.create(coinPickupSound, { audioClipUrl: 'sounds/coinPickup.mp3' })

export const cryManSound = engine.addEntity()
Transform.create(cryManSound)
AudioSource.create(cryManSound, { audioClipUrl: 'sounds/cryboy.mp3',  playing: false })

export const cryWomanSound = engine.addEntity()
Transform.create(cryWomanSound)
AudioSource.create(cryWomanSound, { audioClipUrl: 'sounds/crygirl.mp3',  playing: false })

export const underwaterSound = engine.addEntity()
Transform.create(underwaterSound)
AudioSource.create(underwaterSound, { audioClipUrl: 'sounds/underwater.mp3',  playing: false })

export const fairySound = engine.addEntity()
Transform.create(fairySound)
AudioSource.create(fairySound, { audioClipUrl: 'sounds/fairy.mp3',  playing: false })

export const dropSound = engine.addEntity()
Transform.create(dropSound)
AudioSource.create(dropSound, { audioClipUrl: 'sounds/drop.mp3',  playing: false })

export const whisperSound = engine.addEntity()
Transform.create(whisperSound)
AudioSource.create(whisperSound, { audioClipUrl: 'sounds/whisper.mp3',  playing: false })

export const voiceSound = engine.addEntity()
Transform.create(voiceSound)
AudioSource.create(voiceSound, { audioClipUrl: 'sounds/voice.mp3',  playing: false })

export const waveSound = engine.addEntity()
Transform.create(waveSound)
AudioSource.create(waveSound, { audioClipUrl: 'sounds/waves.mp3',  playing: false })

export const godParent = engine.addEntity();
Transform.create(godParent,
    {
      position: Vector3.create(0, 0, 10),
      scale: Vector3.create(1,1,1),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    }) 

export function addTransporter(position: Vector3, transportTo: Vector3, cameraTarget: Quaternion.MutableQuaternion, action: ()=> void) {
  const transporter = engine.addEntity()
  MeshRenderer.setBox(transporter);
  
  Transform.create(transporter, { 
      position: position,
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(1.5,1.5,1.5)
  })

  Material.setPbrMaterial(transporter, { albedoColor: Color4.Clear() , castShadows: false})

   utils.triggers.addTrigger(
    transporter,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
      movePlayerTo({
        newRelativePosition: transportTo, 
        cameraTarget: Quaternion.fromEulerDegrees(0, 180, 0) }).then((value: MovePlayerToResponse)=>{
        if (action){
          
          action()
        }
      })
      
    }, undefined, Color3.Yellow()) 

    
}
export function addTeleportSphere(description: string, position: Vector3, moveTo: Vector3) {
  const spawner = engine.addEntity()
  Transform.create(spawner, {
    position: position
  })
  
  MeshRenderer.setSphere(spawner)
  MeshCollider.setSphere(spawner)

  pointerEventsSystem.onPointerDown(
    {
      entity: spawner, opts: {
        button: InputAction.IA_POINTER,
        hoverText: description
      }
    }
    ,
    function () {
      movePlayerTo({newRelativePosition: moveTo })
    })
}

export const WaveGrass = engine.defineComponent('WaveGrass', {})


let hasSpider = false;
export function soundSystem(dt: number) {
  const playerPos = Transform.get(engine.PlayerEntity).position

  if (playerPos.x >= 34 && playerPos.x <= 43.4 &&
      playerPos.y >= 10 && playerPos.y <= 21.05 &&
      playerPos.z >= 70 && playerPos.z <= 108) {

    AudioSource.getMutable(voiceSound).playing = false
    Transform.getMutable(whisperSound).position = playerPos
    if(AudioSource.get(whisperSound).playing != true) { 
        
        AudioSource.getMutable(whisperSound).playing = true
        AudioSource.getMutable(whisperSound).loop = true
    }

  } else if (playerPos.x >= 28 && playerPos.x <= 48 &&
    playerPos.y >= 42 &&
    playerPos.z >= 90 && playerPos.z <= 110 )
    
  {
    AudioSource.getMutable(whisperSound).playing = false

    Transform.getMutable(voiceSound).position = playerPos
    if(AudioSource.get(voiceSound).playing != true) { 
        
        AudioSource.getMutable(voiceSound).playing = true
        AudioSource.getMutable(voiceSound).loop = true
    }

  } else {
    AudioSource.getMutable(whisperSound).playing = false
    AudioSource.getMutable(voiceSound).playing = false
  }


  if (
    playerPos.x >= 28 && playerPos.x <= 60 &&
    playerPos.y <= 42 && playerPos.y >= 20 &&
    playerPos.z >= 70 && playerPos.z <= 110 
    ) {

    if(!hasSpider){
      hasSpider = true;
      engine.addSystem(spiderMovementSystem)
    }

  } else {
    if (hasSpider){
      engine.removeSystem(spiderMovementSystem)
      hasSpider = false; 
    }
  }
  
}


