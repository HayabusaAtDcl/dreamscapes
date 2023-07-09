import { Vector3, Quaternion } from '@dcl/sdk/math'
import { engine, GltfContainer, Transform, Animator, Entity, ColliderLayer } from '@dcl/sdk/ecs'
import { Spider } from '../definitions'

const SPIDER_MODEL_PATH = 'models/spiderTube/spiderAnim.glb'
const ATTACK_DISTANCE = 2
const MOVEMENT_SPEED = 2
const ROTATION_SPEED = 1

export function createSpider(position: Vector3) : Entity {
  const spiderEntity = engine.addEntity()
  Transform.create(spiderEntity, {
    position,
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })
  GltfContainer.create(spiderEntity, {
    src: SPIDER_MODEL_PATH
  })
  Animator.create(spiderEntity, {
    states: [
      {
        name: 'Armature.008Action',
        clip: 'Armature.008Action',
        playing: true,
        loop: true
      }
    ]
  })
  Spider.create(spiderEntity, {
    movementSpeed: MOVEMENT_SPEED,
    rotationSpeed: ROTATION_SPEED
  })

  return spiderEntity;
}

export function spiderMovementSystem(deltaTime: number) {
  if (!Transform.has(engine.PlayerEntity)) return
  const playerPos = Transform.get(engine.PlayerEntity).position

  for (const [entity] of engine.getEntitiesWith(Spider)) {
    const transform = Transform.getMutable(entity)

    // Rotate to face player
    const lookAtTarget = Vector3.create(playerPos.x ,transform.position.y, playerPos.z)
    const lookAtDirection = Vector3.subtract(lookAtTarget, transform.position)
    transform.rotation = Quaternion.slerp(
      transform.rotation,
      Quaternion.lookRotation(lookAtDirection),
      ROTATION_SPEED + deltaTime
    )

    // Move towards player until it's at attack distance
    const distance = Vector3.distanceSquared(transform.position, playerPos) // Check distance squared as it's more optimized

    const isInAttackDistance = distance < ATTACK_DISTANCE
    if (!isInAttackDistance) {
      const forwardVector = Vector3.rotate(Vector3.Forward(), transform.rotation)
      const positionDelta = Vector3.scale(forwardVector, MOVEMENT_SPEED * deltaTime)
      transform.position = Vector3.add(transform.position, positionDelta)
      transform.position.y = playerPos.y;
    }

    //Animator.getClip(entity, 'Armature.008Action').playing = !isInAttackDistance
    //Animator.getClip(entity, 'Armature.008Action').playing = isInAttackDistance
  }
}


