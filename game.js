// NOTE!! This js was based off Web Dev Simplified, their repo can be found here -> https://github.com/WebDevSimplified/JavaScript-Text-Adventure
// Additional comments have been added for the project and all TextNodes + states are specific to this game

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// Saves the user's state
let state = {}

// Allows new game to start
function startGame() {
    state = {}
    showTextNode(1)
}

// Allows text container and button to display text within the text node
function showTextNode(textNodeIndex) {

    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
  
    // Allows user to click button and change the text node displayed
    textNode.options.forEach(option => {
      if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
      }
    })
}

// Shows the required buttons per text node
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// Lets user select the option buttons
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
      return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

// TEXT NODES!
const textNodes = [
    {
        id: 1,
        text: "'The Sunrise' is a very old ship, this goes without saying, given that it still actually floats on the ocean rather than hovering over the water. It is owned by your old friend Diego Diez who has invited you to join him on a cruise and meet some of his new friends, you really should have learned to say no to him but it was an offer you couldn't refuse.",
        options: [
            {
                text: 'Continue',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: "You awaken to the harsh screaming and pelting of rain outside your bunk. Great, the ship has sailed right into a storm. The room moves horrifically, and just when you thought it couldn't get any worse your stomach has finally decided that today would be the day that you'd become seasick. Now the question is, should you get up? Or try to go back to sleep?",
        options: [
          {
            text: 'Get up',
            setState: { unDressed: true},
            nextText: 3
          },
          {
            text: 'Stay in bed for five more minutes',
            setState: { sleptIn: true },
            nextText: 4
          }
        ]
    },
    {
        id: 3,
        text: "The cabin is small and cramped, you might as well compare it to a broom closet, but at least you have some sort of privacy here. There is a small washroom right beside the exit and a wardrobe snugly situated beside the bed. You really should get dressed and see if anyone else is up and about.",
        options: [
          {
            text: 'Go for a shower',
            nextText: 5
          },
          {
            text: 'Get dressed',
            requiredState: (currentState) => currentState.unDressed,
            nextText: 6
          },
          {
            text: 'Leave cabin',
            requiredState: (currentState) => currentState.dressedCasual,
            nextText: 9
          },
          {
            text: 'Leave cabin',
            requiredState: (currentState) => currentState.dressedPractical,
            nextText: 9
          }
        ]
    },
    {
      id: 4,
      text: "You try your best to ignore the noise and the rolling of your stomach, but it proves fruitless. Tossing and turning, you manage not only to fail at falling asleep but waste your time trying to fall asleep too. Well, you only have one option now.",
      options: [
        {
          text: 'Get up',
          setState: { unDressed: true},
          nextText: 3
        }
      ]
  },
  {
    id: 5,
    text: "The shower doesn't seem to be working, looks like the storm has caused some sort of issue with the plumbing.",
    options: [
      {
        text: 'Return to cabin',
        nextText: 3
      }
    ]
  },
  {
    id: 6,
    text: "You open the wardrobe and try to find something presentable. Oddly enough, you feel like this might actually be an important choice for once. Best be careful with what you choose.",
    options: [
      {
        text: 'Look at the casual clothes',
        nextText: 7
      },
      {
        text: 'Look at the working clothes',
        nextText: 8
      }
    ]
  },
  {
    id: 7,
    text: "Your 'holiday clothes' you brought from home. Nice and comfy, though not really practical in a storm. Do you want to wear the casual clothes?",
    options: [
      {
        text: 'Put on the casual clothes',
        setState: {dressedCasual: true, unDressed: false},
        nextText: 3
      },
      {
        text: 'Look back',
        nextText: 6
      }
    ]
  },
  {
    id: 8,
    text: "Some old fishing gear from the previous owner. Practical, warm, and smothered in seasalt. You doubt the others will be happy with you wearing this around the boat and getting salt everywhere. Do you want to wear the working clothes?",
    options: [
      {
        text: 'Put on the working clothes',
        setState: {dressedPractical: true, unDressed: false},
        nextText: 3
      },
      {
        text: 'Look back',
        nextText: 6
      }
    ]
  },
  {
    id: 9,
    text: "The hallway to the cabins is narrow and dimly lit, but the waves don't hit you as hard here. All the cabin doors are closed and you don't feel like going back into your cabin any time soon.",
    options: [
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 11
      },
      {
        text: 'Go to the deck',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 10,
    text: "The lounge is just up ahead, the doors are completely closed. This is probably a good thing as it wouldn't be very nice to get hit by a unsecure door.",
    options: [
      {
        text: 'Go into the lounge',
        requiredState: (currentState) => currentState.dressedCasual,
        nextText: 14
      },
      {
        text: 'Go into the lounge',
        requiredState: (currentState) => currentState.dressedPractical,
        nextText: 15
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the second floor',
        nextText: 11
      },
      {
        text: 'Go to the deck',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 11,
    text: "The second floor is right up the stairs, someone should hopefully be up there by the wheel.",
    options: [
      {
        text: 'climb up the stairs',
        nextText: 16
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the deck',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 12,
    text: "The deck is wet and likely dangerous without the right equipment, though the hatch to get out seems to be locked.",
    options: [
      {
        text: 'Break the lock',
        requiredState: (currentState) => currentState.haveHammer,
        setState: {haveHammer: false},
        nextText: 17
      },
      {
        text: 'Use the lockpick',
        requiredState: (currentState) => currentState.haveLockpic,
        nextText: 18
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 13,
    text: "The engine room is just up ahead, the hum of electricity and churn of water echoes to you. It might contain some useful tools.",
    options: [
      {
        text: 'Enter the engine room',
        setState: {noHammer: true},
        nextText: 19
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 11
      },
      {
        text: 'Go to deck',
        nextText: 12
      },
    ]
  },

  // 14 part of lounge pathway
  {
    id: 14,
    text: "Call it performance anxiety, but you aren't too comfortable walking in and talking to a load of people that you barely know without Diego. You should try to find him first.",
    options: [
      {
        text: 'Go back',
        nextText: 10
      }
    ]
  },
  {
    id: 15,
    text: "There is no way you're walking in there dressed like an old sailor! You have an image to uphold, that and someone will definitely get upset at all the salt you're leaving around.",
    options: [
      {
        text: 'Go back',
        nextText: 10
      }
    ]
  },

  // 16 part of upper stairs pathway
  {
    id: 16,
    text: "Something just isn't right about these stairs... Like it isn't time to climb up them yet.",
    options: [
      {
        text: 'Go back',
        nextText: 11
      }
    ]
  },
  {
    id: 17,
    text: "You raise the hammer and with a solid strike you hit the lock on the hatch, it springs open and you are drenched in water. The hammer breaks apart in your hands, the pieces now useless.",
    options: [
      {
        text: 'Go outside',
        requiredState: (currentState) => currentState.dressedPractical,
        nextText: 23
      },
      {
        text: 'Go outside',
        requiredState: (currentState) => currentState.dressedCasual,
        nextText: 24
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 18,
    text: "You use the lockpick to open the hatch, it takes some time as you're not exactly the best at lock picking (and the ship is going topsy curvy), but you get there eventually.",
    options: [
      {
        text: 'Go outside',
        requiredState: (currentState) => currentState.dressedPractical,
        nextText: 23
      },
      {
        text: 'Go outside',
        requiredState: (currentState) => currentState.dressedCasual,
        nextText: 24
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 19,
    text: "The humming of the engines is nearly deafening here, clearly there must be something going on with the machines because you're sure that they weren't this loud when you first boarded the boat",
    options: [
      {
        text: 'Search the toolbox',
        requiredState: (currentState) => currentState.noHammer,
        nextText: 20
      },
      {
        text: 'Search the toolbox',
        requiredState: (currentState) => currentState.haveHammer,
        nextText: 21
      },
      {
        text: 'Leave the room',
        nextText: 13
      }
    ]
  },
  {
    id: 20,
    text: "You search through the toolbox and find a large and heavy hammer, this might be useful. Should you take it?",
    options: [
      {
        text: 'Take the hammer',
        setState: {haveHammer: true, noHammer: false},
        nextText: 22
      },
      {
        text: 'Leave the hammer alone',
        nextText: 19
      }
    ]
  },
  {
    id: 21,
    text: "You search through the toolbox but there is nothing of interest left, just rusty screws and bolts.",
    options: [
      {
        text: 'Return',
        nextText: 19
      }
    ]
  },
  {
    id: 22,
    text: "You take the hammer, though once you lift it you realise that the metal head is loose and that it's likely to break after one hit. Strangely, you get the feeling that you should make that hit count.",
    options: [
      {
        text: 'Return',
        nextText: 19
      }
    ]
  },
  {
    id: 23,
    text: "You're glad that you're wearing the old fisherman's clothes, it keeps you protected and warm. The salt gripping onto the boots help you balance on such a slippery surface. A particularly large waves attacks the boat, but you are quick enough to grab onto a thick chain. As you scramble for a secure hold, you notice something odd about the chain.",
    options: [
      {
        text: 'Investigate the chain',
        nextText: 25
      },
      {
        text: 'Return back inside the boat',
        nextText: 26
      }
    ]
  },
  {
    id: 24,
    text: "Despite not being adequately dressed, you venture out into the biting cold wind. Each droplet of rain felt like acid on your skin, it is so cold that you can't stop shivering. All it took was a particularly large wave and you tumble over the boat's fence, too slow and numb to save yourself. The shock got to you first, then the water.",
    options: [
      {
        text: "BAD END : 'SWIMMING WITH THE FISHES'",
        nextText: -1
      }
    ]
  },
  {
    id: 25,
    text: "Pulling up the chain felt like a bad idea, but as you tug and turn one of the old pieces of fishing equipment, you notice something coming out of the water. Bloated and blue, it's a body. The hook at the end of the chain acted like a noose, and all the nausia returns once you realise that it's Diego.",
    options: [
      {
        text: 'It is just a dream',
        nextText: 27
      },
      {
        text: "Look at Diego's body",
        nextText: 28
      }
    ]
  },
  {
    id: 26,
    text: "You decide to return back into the boat, for now at least. It's far too dangerous outside.",
    options: [
      {
        text: 'Continue',
        nextText: 29
      }
    ]
  },
  {
    id: 27,
    text: "It's just a dream, it has to be! This can't be real. You decide to return back to the boat and run back into your cabin before anyone could stop you. Now standing back where you started, you notice just how darker it has gotten.",
    options: [
      {
        text: 'Go to bed',
        nextText: 30
      }
    ]
  },
  {
    id: 28,
    text: "You're no detective and yet you still decide to investigate his body. There is an aweful look on Diego's face, as if he wasn't at peace when he hit the water. Also, he wouldn't just take his life like this... He was dramatic but never to this extent. It can only mean one thing.",
    options: [
      {
        text: 'He was murdered',
        nextText: 31
      }
    ]
  },
  {
    id: 29,
    text: "The hatch is wide open now, the stairs are soaking in the rain, where do you go from here?",
    options: [
      {
        text: 'Go back outside',
        nextText: 23
      },
      {
        text: 'Go to the cabins',
        nextText: 9
      },
      {
        text: 'Go to the lounge',
        nextText: 10
      },
      {
        text: 'Go to the second floor',
        nextText: 12
      },
      {
        text: 'Go to engine room',
        nextText: 13
      },
    ]
  },
  {
    id: 30,
    text: "You climb back into bed and close your eyes, sleep comes to you eventually... And permanently.",
    options: [
      {
        text: "BAD END : 'IT WAS ALL A DREAM'",
        nextText: -1
      }
    ]
  },
  {
    id: 31,
    text: "Stuck in a storm with a murderer on board, you look at Diego's soulless eyes and tell yourself that you will find the killer, no matter what. You just need to do it before you are their next victim.",
    options: [
      {
        text: "DEMO END : 'A MURDERER ON BOARD'",
        nextText: -1
      }
    ]
  },
]

startGame()