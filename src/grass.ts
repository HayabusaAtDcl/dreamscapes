import { engine, Transform, GltfContainer, Material } from "@dcl/sdk/ecs"
import { Vector3, Quaternion, Color4 } from "@dcl/sdk/math"
import { godParent, WaveGrass } from "./resources"

export function addGrass() {
    
  /// --- Spawn grass blades ---
  const grassModel = 'models/grass.glb'
  const grass2Model = 'models/grass2.glb'
  const grass3Model = 'models/grass3.glb'

  for (let x = 3.4; x < 105.35; x++) {
    for (let y = 3.4; y < 105.35; y++) {
      // select a glb mesh randomly from the 3 variations
      const selector = Math.random()

      if (selector > 0.66) {
        spawnGrass(grassModel, x, 0, y)
      } else if (selector > 0.33) {
        spawnGrass(grass2Model, x, 0, y)
      } else {
        spawnGrass(grass3Model, x, 0, y)
      }
    }
  }

  const ground = engine.addEntity()
  Transform.create(ground, {
    position: Vector3.create(-60, 0, -50),
    scale: Vector3.create(7,7,7),
    parent: godParent
  })


  GltfContainer.create(ground, {
    src: 'models/ground.glb'
  })
}

function spawnGrass(shape: string, x: number, y: number, z: number) {
    
    const grass = engine.addEntity()
  
    // add a transform to the entity
    Transform.create(grass, {
      position: Vector3.create(x, y, z),
      rotation: Quaternion.fromEulerDegrees(0, Math.random() * 30, 0),
      scale: Vector3.create(1, 0.5 + Math.random() / 2, 1)
    })
  
    // add a shape to the entity
    GltfContainer.create(grass, {
      src: shape
    })
  
    //WaveGrass.create(grass)
  
    Material.setPbrMaterial(grass, {
      albedoColor: Color4.create(x / 16, y / 16, z / 4)
    })
  
    return grass
}
  