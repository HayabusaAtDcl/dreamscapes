import { dreamScape } from './intro'
import { fallTubes } from './fallTubes';
import { Vector3 } from '@dcl/sdk/math';
import { cylinderMaze } from './cylinderMaze';
import { spiralDoor } from './spiralDoor';
import { grassyCorridor } from './grassyCorridor';
import { hallway } from './hallway';
import { commandCenter } from './commandCenter';
import { flyBox } from './flyBox';
import { interrogationRoom } from './interrogationRoom';
import { tightValley } from './tightValley';
import { underWater } from './underWater';
import { windowRoom } from './windowRoom';
import { cave } from './cave';
import { kaleidoscopeWheel } from './kaleidoscope';
import { rabbitHoleField } from './rabbitHoleField';
import { tubes } from './tubes';
import { addButterflies } from './butterflyField';
import { addTeleportSphere,  soundSystem } from './resources';

import { engine } from '@dcl/sdk/ecs';
import { addGrass } from './grass';
import { addTeam, oceanFinish } from './oceanFinish';
import { addClues } from './hint';

export function main() {
  addClues()
 
  dreamScape()
  fallTubes()
  cylinderMaze()
  grassyCorridor()
  kaleidoscopeWheel()
  tightValley()
  cave()
  tubes()
  commandCenter()
  spiralDoor()
  rabbitHoleField()
  hallway()
  underWater()
  interrogationRoom()
  windowRoom()
  flyBox() 
  oceanFinish()
  
  addButterflies()
  addGrass()
  engine.addSystem(soundSystem); 

  addTeleportSphere('Teleport to dreamscape!', Vector3.create(5, 1, 5), Vector3.create(88.65 , 190, 43.3))

/*
  
  
  

  addTeleportSphere('Teleport to grass!', Vector3.create(1, 1, 1), Vector3.create(38.11, 11.17, 43.69))
  addTeleportSphere('Teleport to tube!', Vector3.create(2, 1, 2), Vector3.create(30, 12, 32.11))
  addTeleportSphere('Teleport to hallway!', Vector3.create(3, 1, 3), Vector3.create(55.26, 20, 79.07) )
  addTeleportSphere('Teleport to waterfall!', Vector3.create(4, 1, 4), Vector3.create(38.60, 12.33, 98.44))
  addTeleportSphere('Teleport to dreamscape!', Vector3.create(5, 1, 5), Vector3.create(88.65 , 190, 43.3))
  //addTeleportSphere('Teleport to straight tube!', Vector3.create(6, 1, 6), Vector3.create(40.98 , 36.2, 97.16))
  addTeleportSphere('Teleport to windows!', Vector3.create(6, 1, 6),  Vector3.create(54.95, 3, 41.42))
  addTeleportSphere('Teleport to rabbit hole!', Vector3.create(7, 1, 7), Vector3.create(40, 140, 100))
  addTeleportSphere('Teleport to command centre!', Vector3.create(8, 1, 8), Vector3.create(27.26, 12, 90.84))
  addTeleportSphere('Teleport to kaleidoscope!', Vector3.create(9, 1, 9), Vector3.create(43.37, 7.85, 67.15))
  //addTeleportSphere('Teleport to random tunnel!', Vector3.create(10, 1, 10), Vector3.create(56.1, 4.9, 61.83))
  addTeleportSphere('Teleport to underwater!', Vector3.create(11, 1, 11), Vector3.create(19.01, 34.62, 63.1))
  addTeleportSphere('Teleport to underwater!', Vector3.create(23, 1, 62), Vector3.create(19.01, 34.62, 63.1))
  addTeleportSphere('Teleport to cylindermaze!', Vector3.create(24, 1, 24), Vector3.create(30, 12, 32.11) ) 
  addTeleportSphere('Teleport to ocean!', Vector3.create(10, 1, 10), Vector3.create(76.76, 43, 85.94) )
  addTeleportSphere('Teleport to ocean!', Vector3.create(54, 1, 92), Vector3.create(77.81, 4.8, 76.63) ) 
  
  addTeleportSphere('Teleport to ocean!', Vector3.create(54, 1, 92), Vector3.create(77.81, 4.8, 76.63) ) 
*/
}    
