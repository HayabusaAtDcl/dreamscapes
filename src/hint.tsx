import {
    AvatarShape,
    engine,
    GltfContainer,
    Transform,
  } from '@dcl/sdk/ecs'
  import { Color4, Vector3 } from '@dcl/sdk/math'
  import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

import { Clue } from './definitions'
import { godParent } from './resources'
import { main } from '.'

export function addClues(){
  let showClues = false 
  let showHint = false;
  ReactEcsRenderer.setUiRenderer(() => (
   
    <UiEntity
      uiTransform={{ 
        alignItems: 'flex-start',
        flexDirection: 'column',
        margin: '60 0 10px 10px' ,
        }}
    >

      <UiEntity
            uiTransform={{ 
              flexDirection: 'row',
              }}
          >
        <Button
            value= {showClues?"Hide Clues":"Show Clues"}
            variant= 'primary'
            uiTransform={{
              width: 100, 
              height: 20
            
            }}
            uiBackground={{ color: Color4.create(0, 0, 0, 0.8) }}
            onMouseDown={() => {
            showClues = !showClues

            if (showClues) {
                addClue(Vector3.create(0,0,0))
                function addClue(position: Vector3){
                    const clue = engine.addEntity()
                    Transform.create(clue, {
                        position: position,
                        parent: godParent
                    })
                    GltfContainer.create(clue,
                        {
                        src: "models/extras/6Arrows.glb"
                        })

                        Clue.create(clue, {})
                }
            } else {
              
                for (const [entity] of engine.getEntitiesWith(Clue)) {
                    engine.removeEntity(entity)
                }
            }
              } }
          />
    
        <Button
          value= {showHint?"Close Hint":"Show Hint"}
          variant= 'primary'
          uiTransform={{
            width: 100, 
            height: 20,
            margin: '0 0 0px 10px' 
          }}
          uiBackground={{ color: Color4.create(0, 0, 0, 0.8) }}
          onMouseDown={() => {
            console.log("Clicked on the UI")
            showHint = !showHint
            } }
        />
      </UiEntity>

      <UiEntity 
        uiBackground={{
          color: Color4.create(0, 0, 0, 0.6)
        }}
        uiTransform={{ 
          width: '800',
          height: '100%',
          display: showHint ? 'flex': 'none',
          margin: '10 0 0 0px' 
        }}>
        
          <Label
          textAlign="top-left"
            value="
            Catch the scattered stars and unravel the mysteries that lie behind the wooden door. Safe travels through the  dreamscapes! \n \n
          
            With this hint as your guiding light, leap fearlessly into the depths, capturing the green heart as you defy the fall loop's relentless grip. Unlock the secrets  \n
            it holds and ascend to new heights within the realm of lucid dreams. \n \n

            Ascend on ephemeral steps: As you ascend the outer section and leap through the hole in the sky, you will discover the wonders hidden within the inner    \n
            cylinder. Embrace the challenge, trust in your instincts, and let the ethereal beauty of the sky maze lead you to the next stage of your immersive lucid \n
            dream adventure. \n \n

            Embrace the allure of the cave, the cascading waters of the valley, the enigmatic command center, and the vibrant, seemingly meaningless space. Trust in \n
            the whispers of your desires to guide you, for within them lies the wisdom to choose the next step of your extraordinary journey. \n \n
            
            You may find yourself in a vast field nestled between towering mountains. To your surprise, the field begins to rotate, its gentle revolution revealing hidden  \n
            rabbit holes scattered across the landscape. Each rabbit hole holds a mystery, leading you to a destination unknown until you take the leap. However, amidst \n
            this adventure, you must remain  cautious of the lurking spiders, for they have the power to set you back on your journey.\n\n

            In the command center, a mesmerizing portal awaits. Step through this enchanting gateway and find yourself  immersed in a twisting, stretching, and vibrant  \n
            warp in time. As the colors dance around you, the warp brings you to a standstill, face-to-face with a solitary door. \n\n
    
            As you step through the door, a world of anticipation unfolds—a rickety hallway adorned with numerous doors, some firmly shut and locked, while others \n
            reveal a glimpse through their cracked openings. Your task is to find the door that propels. \n\n 

            Through one door, you step into a room adorned with tall, majestic marble pillars that reach towards the ceiling, exuding a sense of grandeur and timeless  \n
            beauty. Yet,as you glance around, a feeling of abandonment hangs in the  air. Overgrown grass carpets  the floor, reclaiming its territory, as if nature itself  \n
            has taken hold in this forgotten  sanctuary.  With reverence and a readiness to soar, step into the beam of blue light and let it carry you towards the unknown. \n\n
            
            As the blue light carries you towards the clouds, you emerge into a breathtaking realm, surrounded by a myriad of windows. The task at hand now is to choose  \n
            the right window, a challenge that may prove to be difficult. However, if you fearlessly faced the interrogation earlier in your journey, you might have noticed  \n
            a subtle hint within the room that directs you to the window leading you beyond this point. \n\n

            As your lucid dream journey nears its completion, embrace the call of the tides, let it lead you towards the mouth of a cave, and step onto the sands of a beach. \n
            There, in the presence of the creators, bask in the glow of accomplishment, knowing that you have ventured through a wondrous dream world and emerged \n 
            triumphant."

          />
      </UiEntity>
    </UiEntity>
  ))
}