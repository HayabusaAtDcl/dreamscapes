import { engine, Schemas } from '@dcl/sdk/ecs'

const DistanceButterfly = {
  originalPos: Schemas.Vector3,
  flying: Schemas.Boolean,
  elapsed: Schemas.Number
}

export const DistanceButterflyComponent = engine.defineComponent('DistanceButterfly', DistanceButterfly)
