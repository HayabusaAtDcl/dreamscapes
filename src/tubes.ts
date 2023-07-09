import {
    engine,
    Transform,
    GltfContainer,  
    ColliderLayer,
    CameraModeArea,
    CameraType} from '@dcl/sdk/ecs'
  
import { addTransporter, godParent } from './resources';
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math';
import { createSpider } from './modules/spider';
import * as utils from '@dcl-sdk/utils' 
import { movePlayerTo } from '~system/RestrictedActions';
export function tubes() {
  addTubes();
}
  
function addTubes() {
  
  const tubes = engine.addEntity();
  GltfContainer.create(tubes,
    {
      src: "models/tubes/tubes.glb",
      invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

  Transform.create(tubes, {
    parent: godParent
  })

  const tubesCollider = engine.addEntity();
  GltfContainer.create(tubesCollider,
    {
      src: "models/tubes/tubesCollider.glb",
      invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

  Transform.create(tubesCollider, {
    parent: godParent
  })

  const spiderTube = engine.addEntity();
  GltfContainer.create(spiderTube,
    {
      src: "models/spiderTube/spiderTube.glb"
    })

  Transform.create(spiderTube, {
    parent: godParent
  })

  const cameraArea = engine.addEntity()
  Transform.create(cameraArea, {
    position: Vector3.create(42, 30, 100),
      scale: Vector3.create(80,30, 80),
  })
  
   
  CameraModeArea.create(cameraArea, {
    area: Vector3.create(80,30, 80),
    mode: CameraType.CT_FIRST_PERSON,
  })
 
  const cameraAreaKaleidoscope = engine.addEntity()
  Transform.create(cameraAreaKaleidoscope, {
    position: Vector3.create(45, 8, 69),
      scale: Vector3.create(28, 12, 15)
  })
  //MeshRenderer.setBox(cameraAreaKaleidoscope)
  //Material.setPbrMaterial(cameraAreaKaleidoscope, { albedoColor: Color4.Red() , castShadows: false})
  CameraModeArea.create(cameraAreaKaleidoscope, {
    area: Vector3.create(28, 12, 15),
    mode: CameraType.CT_FIRST_PERSON,
  })


  addTransporter(Vector3.create(52, 4.9, 65.83), Vector3.create(40, 140, 100), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {})
  addTransporter(Vector3.create(45.36, 8.73, 85.77), Vector3.create(40, 140, 100), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {})
  addTransporter(Vector3.create(34.41, 47.3, 103), Vector3.create(40, 140, 100), Quaternion.fromEulerDegrees(0, 0, 0), ()=> {})

  const spider = createSpider(Vector3.create(47.54, 29.36 , 85.23))
  utils.triggers.addTrigger(
    spider,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box' }],
    () => {
      movePlayerTo({newRelativePosition: Vector3.create(40, 140, 100) })
    }, undefined, Color3.Yellow())
}
  