import { AudioSource, engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { coinPickupSound } from './resources';

export function setupPickableItems(
    modelSrc: string, 
    itemPositions:  Vector3.MutableVector3[], 
    rotation: Quaternion.MutableQuaternion,
    action: ()=> void) {
        
        for (const itemPosition of itemPositions) {
            createPickableItem(modelSrc, itemPosition, Vector3.create(1,1,1), rotation, Vector3.create(0, 1, 0))
        }


        let counter = 0;

        function createPickableItem(model: string, position: Vector3, size: Vector3, rotation: Quaternion.MutableQuaternion, centerOffset: Vector3): Entity {
            const entity = engine.addEntity()
            GltfContainer.create(entity, { src: model })
            Transform.create(entity, { 
                position: position ,
                scale: size,
                rotation: rotation
            })

            utils.triggers.oneTimeTrigger(
            entity,
            utils.LAYER_1,
            utils.LAYER_1,
            [{ type: 'box' }],
            () => {
                counter = counter + 1;
                Transform.getMutable(coinPickupSound).position = Transform.get(engine.PlayerEntity).position
                AudioSource.getMutable(coinPickupSound).playing = true
                engine.removeEntity(entity)

                if (counter >= itemPositions.length) {
                    action();
                }
                    
            }, Color3.Yellow())

            return entity;
        }
}
