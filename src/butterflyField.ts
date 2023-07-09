import {
  Animator,
    engine,
    EngineInfo,
    GltfContainer,
    GltfContainerLoadingState,
    IEngine,
    LoadingState,
    Transform
  } from '@dcl/sdk/ecs'
  import { Vector3 } from '@dcl/sdk/math'
  import { proximitySystem, spawnButterflies } from './modules/butterflies'
  import { mendezCoroutineRuntime } from './modules/coroutine'
import { godParent } from './resources'
  

export function addButterflies() {
  // please do not remove this coroutine, it exists to test the compliance of the GltfContainerLoadingState component
  const corountime = mendezCoroutineRuntime(engine)

  function logCurrentMoment(log: string) {
    const info = EngineInfo.get(engine.RootEntity)
    console.log(`tick=${info.tickNumber} frame=${info.frameNumber} runtime=${info.totalRuntime} -- ${log}`)
  }

  corountime.run(function* waitForAllGtfLoaded() {
    logCurrentMoment(`initializing coroutine`)

    const ground = engine.addEntity()
    GltfContainer.create(ground, {
      src: 'models/grassyCooridor/grassyCooridor.glb'
    })

    Transform.create(ground, {
      parent: godParent
    })

    // preload the animated glbs (underground), for faster loading
    const butterflyPreloadDummy = engine.addEntity()
    GltfContainer.create(butterflyPreloadDummy, {
      src: 'models/grassyCooridor/butterflyAnim.glb'
    })

  
    Transform.create(butterflyPreloadDummy, {
      position: Vector3.create(8, -10, 6),
      scale: Vector3.create(3,3,3)
    })

    //  preload the animated glbs (underground), for faster loading
    const butterflyFlyingPreloadDummy = engine.addEntity()
    GltfContainer.create(butterflyFlyingPreloadDummy, {
      src: 'models/grassyCooridor/butterflyAnim.glb'
    })


    Transform.create(butterflyFlyingPreloadDummy, {
      position: Vector3.create(8, -10, 6),
      scale: Vector3.create(3,3,3)
    })

    yield* waitForAllModelsToLoad(engine)

    logCurrentMoment('spawnButterflies')

    spawnButterflies(Vector3.create(31, 10, 48))
    spawnButterflies(Vector3.create(50, 50.5, 103))
    spawnButterflies(Vector3.create(77.81, 4.8, 76.63))

    engine.addSystem(proximitySystem)
  })

  function* waitForAllModelsToLoad(engine: IEngine) {
    logCurrentMoment('flushing all changes to the renderer')

    yield // send all updates to renderer

    while (true) {
      let areLoading = false

      for (const [_entity, loadingState] of engine.getEntitiesWith(GltfContainerLoadingState)) {
        if (loadingState.currentState == LoadingState.LOADING) {
          areLoading = true
          logCurrentMoment('models are still loading')
          break
        }
      }

      if (areLoading) {
        yield // wait one frame
      } else {
        break // finish the loading loop
      }
    }
  }

}