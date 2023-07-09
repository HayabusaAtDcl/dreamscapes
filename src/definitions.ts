import { engine, Schemas, PBMaterial_PbrMaterial } from '@dcl/sdk/ecs'

export const BoxBody = engine.defineComponent('BoxBody', {
  boxBodyId: Schemas.Number
})

export const Spider = engine.defineComponent('Spider', {
  movementSpeed: Schemas.Number,
  rotationSpeed: Schemas.Number
})

export const Clue = engine.defineComponent('Clue', {
  
})


export enum WearableBodyShape {
  MALE = 'urn:decentraland:off-chain:base-avatars:BaseMale',
  FEMALE = 'urn:decentraland:off-chain:base-avatars:BaseFemale'
}