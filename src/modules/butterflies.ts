import { Animator, engine, GltfContainer, Raycast, RaycastQueryType, raycastSystem, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { DistanceButterflyComponent } from './components'

export function spawnButterflies(center: Vector3) {
  //set the center of the butterfly scattering area to the center of the scene
const CENTER = center

const SIDE_LENGTH: number = 20 // size of the area to spawn butterfly in 120 for the many
const ROWS: number = 20
const COLS: number = 20
const SPACING: number = SIDE_LENGTH / ROWS

//set the starting positions of the butterfly spawn grid to the south-west corner of the spawn area
const BASE = Vector3.create(CENTER.x - SIDE_LENGTH / 2, CENTER.y, CENTER.z - SIDE_LENGTH / 2)

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      //generate positions iterating through all rows and columns  and add large random offsets along X an Z (Y will adapt to the terrain later)
      const newPos = Vector3.create(
        BASE.x + i * SPACING + Math.random() * 20 - 10,
        BASE.y,
        BASE.z + j * SPACING + Math.random() * 20 - 10
      )

      const butterflySpawnerEntity = engine.addEntity()
      Transform.create(butterflySpawnerEntity, { position: newPos })
      // create a ray at the X,Z coord of the generated position which starts high up and has a downward direction
      // cast the ray downward and try to intersect it with the terrain's collider
      raycastSystem.registerGlobalDirectionRaycast(
        {
          entity: butterflySpawnerEntity,
          opts: {
            direction: Vector3.Down(),
            maxDistance: 22,
            queryType: RaycastQueryType.RQT_HIT_FIRST,
            continuous: false
          }
        },
        (result) => {
          // if we hit the collider set the generated butterfly position's Y coord to the hitpoint's height
          if (!result.hits.length) {
            console.error(
              '❌🚨 NO RAYCAST RESULT! IF YOU ARE SEEING THIS ERROR IT MEANS THE FLOOR DID NOT LOAD BEFORE CALLING THE FIRST ONUPDATE',
              result
            )
            return
          } else {
            console.log('GOT A RAYCAST HIT', result)
          }
          const spawnPos = result.hits[0].position
          const revisedSpawnPos = Vector3.create(spawnPos?.x, (spawnPos?.y??0)+ 0.4, spawnPos?.z)
          if (!revisedSpawnPos) return
          createButterfly(revisedSpawnPos)
        }
      )
    }
  }
  
}

export function createButterfly(newPos: Vector3) {
  const entity = engine.addEntity()

  //spawn a butterfly at the generated and terrain adapted position
  Transform.create(entity, {
    position: newPos,
    rotation: Quaternion.fromEulerDegrees(0, Math.random() * 360, 0),
    scale: Vector3.create(3,3,3)
  })
  GltfContainer.create(entity, {
    src: 'models/grassyCooridor/butterflyAnim.glb'
  })

  
  DistanceButterflyComponent.create(entity, {
    elapsed: Math.random(),
    flying: false,
    originalPos: newPos
  })
}

// System that checks distances to each butterfly
export function proximitySystem(dt: number) {
  
  const RADIUS: number = 2 // how close you can get to a butterfly before it reacts
  const AMPLITUDE: number = 1

  for (const [entity, butterflyInfo] of engine.getEntitiesWith(DistanceButterflyComponent)) {
    const playerTransform = Transform.getOrNull(engine.PlayerEntity)
    if (!playerTransform) {
      return
    }

    const playerPos = playerTransform.position

    // calculate the distance between the player and the butterfly original position
    let dist = Vector3.distance(butterflyInfo.originalPos, playerPos)
    //realDistance(butterflyInfo.originalPos, playerPos)

    // if the player is within a certain distance from the butterfly original perching position
    if (dist < RADIUS) {
      const mutableButterflyInfo = DistanceButterflyComponent.getMutable(entity)
      const mutableTransform = Transform.getMutable(entity)

      // calculate a ratio (0-1) based on how close the player is to the butterfly and multiply it with a constant to amplify the effect
      let multiplier = (1 - dist / RADIUS) * AMPLITUDE

      // calculate the direction pointing from the player to the butterfly's default position
      let playerDir = Vector3.subtract(butterflyInfo.originalPos, playerPos)

      // if the butterfly was idle, change it to flying and replace the GLTF model with the flying one
      if (!butterflyInfo.flying) {
        mutableButterflyInfo.flying = true
        //GltfContainer.createOrReplace(entity, { src: 'models/grassyCooridor/butterflyAnim.glb' })
       
      }

      // move the butterfly away from the player on the X and Z axis based on the closeness multiplier
      mutableTransform.position = Vector3.add(
        butterflyInfo.originalPos,
        Vector3.multiplyByFloats(playerDir, multiplier, 0, multiplier)
      )

      // always move the butterfly upwards on the Y axis (never downwards) regardless of player direction
      mutableTransform.position.y = butterflyInfo.originalPos.y + 6 * multiplier

      // increment the timer stored for each butterfly and use the sine of this time to wiggle the butterfly around the actual position calculated above
      mutableButterflyInfo.elapsed += dt
      mutableTransform.position.x += Math.sin(butterflyInfo.elapsed * 10) * multiplier
      mutableTransform.position.y += Math.sin(butterflyInfo.elapsed * 8) * multiplier
      mutableTransform.position.z += Math.sin(butterflyInfo.elapsed * 11) * multiplier

      // make the flying butterfly always face the player
      mutableTransform.rotation = Quaternion.fromLookAt(mutableTransform.position, playerPos)
    } // in case the player is farther from the butterfly than the given radius
    // make the flying butterfly change GLTF shape to the idle one
    else if (butterflyInfo.flying) {
      const mutableButterflyInfo = DistanceButterflyComponent.getMutable(entity)
      const mutableTransform = Transform.getMutable(entity)

      mutableButterflyInfo.flying = false
      //GltfContainer.createOrReplace(entity, { src: 'models/grassyCooridor/butterflyAnim.glb' })
      

      //make the butterfly land on its original position
      mutableTransform.position = butterflyInfo.originalPos
    }
  }
}
