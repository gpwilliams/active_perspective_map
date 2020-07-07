// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.PostMessage",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "Perspective and Active Engagement Study",
    "description": "This is a mouse tracking task where participants listen to a story while they view a map with several locations on it. \n\nParticipants are randomly assigned to conditions where they are instructed that they will hear a second- or third-person perspective story about a character. They are also instructed that should actively click on locations mentioned within the story or to listen passively.\n\nParticipants can click on AOIs on the locations. X and Y axis locations, along with the label of the AOI is pushed to the data on the first click within an AOI. In the \"Active\" listening condition, a red X is drawn on the location on the first click.\n\nThroughout the map section, the mouse coordinates are captured.\n\nAfter this, participants complete a quiz, optionally submitting multiple choice answers assessing content from the story. A debrief follows this section.",
    "repository": "https:\u002F\u002Fgithub.com\u002Fgpwilliams\u002Factive_perspective_map",
    "contributors": "Glenn Williams \u003Cglenn.williams@sunderland.ac.uk\u003E (https:\u002F\u002Fglennwilliams.me)"
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "perspective": "second-person",
          "engagement": "active",
          "audio": "active-second-person-story.mp3",
          "audioLength": "230819"
        },
        {
          "perspective": "third-person",
          "engagement": "active",
          "audio": "active-third-person-story.mp3",
          "audioLength": "235991"
        },
        {
          "perspective": "second-person",
          "engagement": "passive",
          "audio": "passive-second-person-story.mp3",
          "audioLength": "227110"
        },
        {
          "perspective": "third-person",
          "engagement": "passive",
          "audio": "passive-third-person-story.mp3",
          "audioLength": "232726"
        }
      ],
      "sample": {
        "mode": "draw-shuffle",
        "n": "1"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Loop",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {
          "treasure_map.png": "embedded\u002F732c3d4e6c73476f1afe49df106ea1bed5566f34fda1b8d578025da10920f28d.png",
          "active-second-person-story.mp3": "embedded\u002Fb909c5484344e84cf3bb5e19605ce5fcde754b69b95fecafa8c42e3bc93ebea4.mp3",
          "active-third-person-story.mp3": "embedded\u002Fdfd496e70cce462ae4363e74831ab85fecd827cb156c7e5ec7c42f9a8881cfa3.mp3",
          "passive-second-person-story.mp3": "embedded\u002Ff9b82dd78f5964f85a0befed57c37eef39741426f7fd1f41831998c47832db49.mp3",
          "passive-third-person-story.mp3": "embedded\u002Fa3fd185d5ad9971be7d2c9ca025dd1fc6da7b3d0297b422135d0c85dd66c7b69.mp3"
        },
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "Instructions",
                "content": "\u003Ch3\u003E\u003Cb\u003EPlease read these instructions aloud to your child\u003C\u002Fb\u003E\u003C\u002Fh2\u003E\n\n\nNext, you will see a treasure map of \u003Cb\u003ESkull Island\u003C\u002Fb\u003E with some locations on it.\n\n\u003Cp id=\"characterString\"\u003E\u003C\u002F\u003E\n\n\u003Cp id=\"perspectiveString\"\u003E\u003C\u002Fp\u003E\n\n\u003Cp id=\"finishString\"\u003E\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter the story, \u003Cb\u003Eyou will take part in a little quiz\u003C\u002Fb\u003E about what you learned from the story.\u003C\u002Fp\u003E\n\n\u003Cp\u003E\u003Ci\u003EYou cannot submit your responses until after the story is finished.\u003C\u002Fi\u003E\u003Cp\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get conditions
var perspective = this.parameters.perspective;
var engagement = this.parameters.engagement;

// set up template for instructions
var instructionsCharacter = {
  partA: "You will hear a story about",
  partB: "",
  partC: "going to diffent locations on the island."
};

var instructionsPerspective = {
  partA: "Please listen to the story carefully",
  partB: ""
};

var instructionsFinish = {
  partA: "When the story is finished",
  partB: "",
  partC: "please click <b>Submit</></b>."
};

// define instructions that can vary
var varyingInstructions = {
  perspectiveSecond: " <b>yourself</b> ",
  perspectiveThird: " <b>Blackbeard Tom</b> ",
  engagementActive: " and <b>click on the locations when they are mentioned.</b>",
  engagementPassive: ".",
  finishActive: " and you have clicked all of the locations, ",
  finishPassive: ", "
}

// check conditions, vary instructions depending on them
if(perspective == "second-person" && engagement == "active") {
   instructionsCharacter["partB"] = varyingInstructions["perspectiveSecond"];
   instructionsPerspective["partB"] = varyingInstructions["engagementActive"];
   instructionsFinish["partB"] = varyingInstructions["finishActive"];
} else if(perspective == "second-person" && engagement == "passive") {
  instructionsCharacter["partB"] = varyingInstructions["perspectiveSecond"];
  instructionsPerspective["partB"] = varyingInstructions["engagementPassive"];
  instructionsFinish["partB"] = varyingInstructions["finishPassive"];
} else if(perspective == "third-person" && engagement == "active") {
  instructionsCharacter["partB"] = varyingInstructions["perspectiveThird"];
  instructionsPerspective["partB"] = varyingInstructions["engagementActive"];
  instructionsFinish["partB"] = varyingInstructions["finishActive"];
} else {
  // third-person passive instructions
  instructionsCharacter["partB"] = varyingInstructions["perspectiveSecond"];
  instructionsPerspective["partB"] = varyingInstructions["engagementPassive"];
  instructionsFinish["partB"] = varyingInstructions["finishActive"];
}

// push instructions to the html paragraph.
document.getElementById("characterString").innerHTML = 
instructionsCharacter["partA"] + 
instructionsCharacter["partB"] + 
instructionsCharacter["partC"]

document.getElementById("perspectiveString").innerHTML =   instructionsPerspective["partA"] +
  instructionsPerspective["partB"]

document.getElementById("finishString").innerHTML = 
  instructionsFinish["partA"] +
  instructionsFinish["partB"] +
  instructionsFinish["partC"]
}
            },
            "title": "Instructions"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n\u003Cdiv class=\"parent\"\u003E\n\u003Ccanvas\n    id=\"can\",\n    width=\"750\"\n    height=\"580\"\n    style=\"position:absolute; border: 0px solid;\"\n  \u003E\n\u003C\u002Fcanvas\u003E\n\n\u003Cimg src=\"${ this.files['treasure_map.png'] }\" width=\"750\" height=\"580\" class=\"map\"\u002F\u003E\n\u003Cdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter\u003E\n  \u003Cform class=\"content-vertical-center content-horizontal-space-around\"\u003E\n    \u003C!-- \u003Cbutton id=\"clear\" type=\"button\"\u003EClear\u003C\u002Fbutton\u003E--\u003E\n    \u003Cbutton id = \"submitMap\" type=\"submit\" style=\"color: #666666; background-color: #cccccc;\" onclick=\"clicked()\"\u003ESubmit\u003C\u002Fbutton\u003E\n  \u003C\u002Fform\u003E\n\u003C\u002Ffooter\u003E",
                "title": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": function anonymous(
) {
let isDrawing = false
let prevX, prevY
let currX, currY
const lineStyle = 'red'
const lineWidth = 5
const fontStyle = '50px Georgia'

// store click positions
this.data.cursorPositions = []
this.data.aoiPositions = []

// define click counts for AOIs
let clickCounts = {
  skull: 0,
  anchor: 0,
  trees: 0,
  rockpool: 0,
  barrels: 0,
  waves: 0,
  volcano: 0,
  dock: 0,
  waterfall: 0,
  fire: 0,
  bridge: 0,
  rocks: 0
}

// Logic -----------------------------------------------------------------------
const updatePosition = function(e) {
  prevX = currX
  prevY = currY
  currX = e.offsetX
  currY = e.offsetY
  // could also save the coordinates here
}
const drawPoint = function(canvas) {
  const ctx = canvas.getContext("2d")
  ctx.beginPath()
  ctx.fillStyle = lineStyle
  //ctx.fillRect(currX, currY, 10, 10)
  ctx.font = fontStyle
  ctx.fillText("X", currX -10, currY + 10)
}
const erase = function() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Event handling --------------------------------------------------------------

this.options.events['mousemove canvas'] = function(e) {
  if (isDrawing) {
    updatePosition(e)
  }
}

// register clicks on AOIs
this.options.events['mousedown canvas'] = function(e) {
  
  // set drawing state
  isDrawing = true
  updatePosition(e)

  // capture the AOI and draw it on the screen
  // arrow function for lexical scoping
   let captureDrawAOI = (index) => {
    // only draw x if in the interactive conditions
    // (still capture data though)
    if(this.parameters.engagement == "active") {
      drawPoint(e.target)
    }
    // push data from click
    this.data.cursorPositions.push([currX, currY])
    this.data.aoiPositions.push(index)
    clickCounts[index] ++
  }

  //for testing: 
  //alert([currX, currY])

  // draw exes, capture AOI clicked on, push to data, stop multiple clicks
  if(currX > 570 && currX < 745 && currY > 410 && currY < 555 && clickCounts["skull"] < 1) {
  captureDrawAOI("skull")
  }; 
  if(currX > 440 && currX < 540 && currY > 440 && currY < 565 && clickCounts["anchor"] < 1) {
  captureDrawAOI("anchor")
  }; 
  if(currX > 145 && currX < 255 && currY > 310 && currY < 435 && clickCounts["trees"] < 1) {
  captureDrawAOI("trees")
  }; 
 if(currX > 270 && currX < 380 && currY > 340 && currY < 410 && clickCounts["rockpool"] < 1) {
  captureDrawAOI("rockpool")
  }; 
  if(currX > 390 && currX < 490 && currY > 335 && currY < 410 && clickCounts["barrels"] < 1) {
  captureDrawAOI("barrels")
  }; 
  if(currX > 10 && currX < 155 && currY > 180 && currY < 315 && clickCounts["waves"] < 1) {
  captureDrawAOI("waves")
  }; 
  if(currX > 270 && currX < 410 && currY > 160 && currY < 320 && clickCounts["volcano"] < 1) {
  captureDrawAOI("volcano")
  }; 
  if(currX > 525 && currX < 665 && currY > 245 && currY < 350 && clickCounts["dock"] < 1) {
  captureDrawAOI("dock")
  };
  if(currX > 410 && currX < 540 && currY > 120 && currY < 250 && clickCounts["waterfall"] < 1) {
  captureDrawAOI("waterfall")
  };
  if(currX > 600 && currX < 685 && currY > 135 && currY < 230 && clickCounts["fire"] < 1) {
  captureDrawAOI("fire")
  }; 
  if(currX > 190 && currX < 350 && currY > 40 && currY < 150 && clickCounts["bridge"] < 1) {
  captureDrawAOI("bridge")
  }; 
  if(currX > 560 && currX < 700 && currY > 40 && currY < 125 && clickCounts["rocks"] < 1) {
  captureDrawAOI("rocks")
  };     
}

this.options.events['mouseup canvas'] =
this.options.events['mouseout canvas'] = function() {
  isDrawing = false
}

// not used anymore, but deletes all xes from screen
this.options.events['click button#clear'] = function() {
  erase()
}

// timing: this.parameters.audioLength is defined in the loop table
this.options.events["click button#submitMap"] = function(e) {
  // stop clicking submit from allowing them to submit
  e.preventDefault()
  // alert saying they can't click until after the story
  if(this.timer < this.parameters.audioLength) {
    // DO NOTHING, could do alert but timer still runs while audio is paused
  }
  // allow submit after the story
  if(this.timer > this.parameters.audioLength) {
    this.submit()
  }
}
},
              "run": function anonymous(
) {
setTimeout(() => {
document.getElementById("submitMap").style.background = "#0099cc"
document.getElementById("submitMap").style.color = "#ffffff"
}, this.parameters.audioLength)
}
            },
            "title": "Trial",
            "plugins": [
              {
                "type": "mousetrap",
                "mode": "mousetrap",
                "path": "global.MousetrapPlugin"
              }
            ],
            "timeline": [
              {
                "type": "sound",
                "start": "1000",
                "stop": "",
                "priority": 0,
                "payload": {
                  "src": "${ this.files[parameters.audio] } "
                }
              }
            ],
            "timeout": "250000"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "Quiz",
          "content": "We have some questions we'd like to ask you about the story. \n\nPlease read these questions and possible answers aloud to your child and fill out the form based on their response.\n\n\u003Cp\u003E\u003Ci\u003EPlease be sure to scroll down to see all questions and answers\u003C\u002Fi\u003E\u003C\u002Fp\u003E"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "To find treasure",
              "coding": "correct_find-treasure"
            },
            {
              "label": "For a party",
              "coding": "incorrect_party"
            },
            {
              "label": "To see family",
              "coding": "incorrect_family"
            }
          ],
          "label": "Why go to skull Island?",
          "name": "q01",
          "shuffle": true
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "By train",
              "coding": "incorrect_train"
            },
            {
              "label": "By boat",
              "coding": "incorrect_boat"
            },
            {
              "label": "By crossing a bridge",
              "coding": "incorrect_bridge"
            }
          ],
          "label": "How can you get to Skull Island?",
          "shuffle": true,
          "name": "q02"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "Waves",
              "coding": "correct_waves"
            },
            {
              "label": "Waterfall",
              "coding": "incorrect_waterfall"
            },
            {
              "label": "Rockpool",
              "coding": "incorrect_rockpool"
            }
          ],
          "label": "What did the dolphins play in?",
          "shuffle": true,
          "name": "q03"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "Building nests",
              "coding": "incorrect_building"
            },
            {
              "label": "Flying",
              "coding": "incorrect_flying"
            },
            {
              "label": "Squawking",
              "coding": "correct_squawking"
            }
          ],
          "label": "What were the parrots doing?",
          "shuffle": true,
          "name": "q04"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "They took pity",
              "coding": "correct_pity"
            },
            {
              "label": "They were scared",
              "coding": "incorrect_scared"
            },
            {
              "label": "They were angry",
              "coding": "incorrect_angry"
            }
          ],
          "label": "Why did the parrots help?",
          "name": "q05",
          "shuffle": true
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "In the trees",
              "coding": "incorrect_trees"
            },
            {
              "label": "In a hole",
              "coding": "correct_hole"
            },
            {
              "label": "In a cave",
              "coding": "incorrect_cave"
            }
          ],
          "label": "Where was the treasure hidden?",
          "shuffle": true,
          "name": "q06"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "On the beach",
              "coding": "correct_beach"
            },
            {
              "label": "By the waterfall",
              "coding": "incorrect_waterfall"
            },
            {
              "label": "In a boat",
              "coding": "incorrect_boat"
            }
          ],
          "label": "Where were the crabs?",
          "shuffle": true,
          "name": "q07"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "Swimming",
              "coding": "incorrect_swimming"
            },
            {
              "label": "Sunbathing",
              "coding": "correct_sunbathing"
            },
            {
              "label": "Sailing",
              "coding": "incorrect_sailing"
            }
          ],
          "label": "What was the sea lion doing?",
          "name": "q08",
          "shuffle": true
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "On the sand",
              "coding": "incorrect_sand"
            },
            {
              "label": "On a rock",
              "coding": "correct_rock"
            },
            {
              "label": "On a boat",
              "coding": "incorrect_boat"
            }
          ],
          "label": "Where was the sea lion?",
          "shuffle": true,
          "name": "q09"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "In the sea",
              "coding": "incorrect_sea"
            },
            {
              "label": "By the waterfall",
              "coding": "correct_waterfall"
            },
            {
              "label": "In a fish tank",
              "coding": "incorrect_fishtank"
            }
          ],
          "label": "Where were the fish?",
          "shuffle": true,
          "name": "q10"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "In the palm trees",
              "coding": "correct_palm"
            },
            {
              "label": "Flying in the sky",
              "coding": "incorrect_sky"
            },
            {
              "label": "On a cliff",
              "coding": "incorrect_cliff"
            }
          ],
          "label": "Where were the parrots?",
          "shuffle": true,
          "name": "q11"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "They know the island",
              "coding": "correct_island"
            },
            {
              "label": "They want to make friends",
              "coding": "incorrect_friends"
            },
            {
              "label": "They will steal the treasure",
              "coding": "incorrect_treasure"
            }
          ],
          "label": "Why ask the animals for help?",
          "shuffle": true,
          "name": "q12"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "Heavy",
              "coding": "correct_heavy"
            },
            {
              "label": "Light",
              "coding": "incorrect_light"
            },
            {
              "label": "Beautiful",
              "coding": "incorrect_beautiful"
            }
          ],
          "label": "What was the treasure chest like to carry?",
          "name": "q13",
          "shuffle": true
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "Because it was shiny.",
              "coding": "incorrect_shiny"
            },
            {
              "label": "Because it was fun.",
              "coding": "correct_fun"
            },
            {
              "label": "Because he was happy.",
              "coding": "incorrect_happy"
            }
          ],
          "label": "Please select answer \"Because it was fun.\"",
          "shuffle": true,
          "name": "attention_check"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "They look pretty",
              "coding": "incorrect_pretty"
            },
            {
              "label": "They show where the treasure is buried",
              "coding": "incorrect_treasure"
            },
            {
              "label": "The map was added to on different trips",
              "coding": "correct_addedto"
            }
          ],
          "label": "Why were there extra pictures on the map?",
          "shuffle": true,
          "name": "q14"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "To keep it dry",
              "coding": "incorrect_dry"
            },
            {
              "label": "To stop it being stolen",
              "coding": "correct_stolen"
            },
            {
              "label": "For the animals to find it",
              "coding": "incorrect_find"
            }
          ],
          "label": "Why was the treasure buried?",
          "name": "q15",
          "shuffle": true
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "On the beach",
              "coding": "correct_beach"
            },
            {
              "label": "On the rocks",
              "coding": "incorrect_rocks"
            },
            {
              "label": "On the jetty",
              "coding": "incorrect_jetty"
            }
          ],
          "label": "Where was the dinghy left?",
          "shuffle": true,
          "name": "q16"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "A fire",
              "coding": "incorrect_fire"
            },
            {
              "label": "A forest",
              "coding": "incorrect_forest"
            },
            {
              "label": "A volcano",
              "coding": "correct_volcano"
            }
          ],
          "label": "What is in the centre of the island?",
          "shuffle": true,
          "name": "q17"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "The stream",
              "coding": "correct_stream"
            },
            {
              "label": "The fish",
              "coding": "incorrect_fish"
            },
            {
              "label": "The parrots",
              "coding": "incorrect_parrots"
            }
          ],
          "label": "What do you need to follow to find the waterfall?",
          "shuffle": true,
          "name": "q18"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "A crab",
              "coding": "incorrect_crab"
            },
            {
              "label": "A fish",
              "coding": "incorrect_fish"
            },
            {
              "label": "A bird",
              "coding": "correct_bird"
            }
          ],
          "label": "What is a parakeet?",
          "shuffle": true,
          "name": "q19"
        },
        {
          "required": false,
          "type": "radio",
          "options": [
            {
              "label": "To stop it floating away",
              "coding": "correct_floating"
            },
            {
              "label": "It's good exercise",
              "coding": "incorrect_exercise"
            },
            {
              "label": "To stop the dolphins playing with it",
              "coding": "incorrect_dolphins"
            }
          ],
          "label": "Why drag the rowing boat up the beach?",
          "shuffle": true,
          "name": "q20"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Questions"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "Debrief",
          "content": "\u003Cp\u003EThank you for participating in this online study, which explores whether engagement and narrative perspective work together to improve listening comprehension.  Results of the study could inform future methods for improving narrative comprehension in children.  We hope that you have found it interesting and have enjoyed the experience. However, if you have any concerns regarding the experience and you wish to speak to one of the researchers, please contact either:\u003C\u002Fp\u003E\n\n\u003Cul\u003E\n\u003Cli\u003EKerry Vart (Researcher)\u003Cbr\u003E\nEmail: \u003Ca href=\"mailto:bh56od@student.sunderland.ac.uk\" target=”_blank”\u003Ebh56od@student.sunderland.ac.uk\u003C\u002Fa\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003EDr Glenn Williams (Research Supervisor)\u003Cbr\u003E\nEmail: \u003Ca href=\"mailto:glenn.williams@sunderland.ac.uk\" target=”_blank”\u003Eglenn.williams@sunderland.ac.uk\u003C\u002Fa\u003E\u003Cbr\u003E\nPhone: 0191 515 2522\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\nYou may feel you would like more advice and access to different stories to engage your child. The following websites offer access to free e-books and guidance on encouraging a love of books:\n\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwww.booktrust.org.uk\u002Fbooks-and-reading\u002Ftips-and-advice\u002Freading-tips\u002F\" target=”_blank”\u003Ehttps:\u002F\u002Fwww.booktrust.org.uk\u002Fbooks-and-reading\u002Ftips-and-advice\u002Freading-tips\u002F\u003C\u002Fa\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwww.oxfordowl.co.uk\u002Ffor-home\u002Ffind-a-book\u002Flibrary-page\u002F\" target=”_blank”\u003Ehttps:\u002F\u002Fwww.oxfordowl.co.uk\u002Ffor-home\u002Ffind-a-book\u002Flibrary-page\u002F \u003C\u002Fa\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\nIf your child has enjoyed the pirate story you may wish to investigate further pirate activities on the websites below:\n\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwww.bbc.co.uk\u002Fcbeebies\u002Ftopics\u002Fpirates\" target=”_blank”\u003Ehttps:\u002F\u002Fwww.bbc.co.uk\u002Fcbeebies\u002Ftopics\u002Fpirates\u003C\u002Fa\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca href=\"https:\u002F\u002Fwww.bbc.co.uk\u002Fcbbc\u002Fcurations\u002Fpirates-on-cbbc\" target=”_blank”\u003Ehttps:\u002F\u002Fwww.bbc.co.uk\u002Fcbbc\u002Fcurations\u002Fpirates-on-cbbc\u003C\u002Fa\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\n\u003Cp\u003EThank you for taking the time to be a part of this study.\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Debrief"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "Goodbye",
          "content": "Thank you for taking part!"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "hidden",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Goodbye",
      "timeout": "5000"
    }
  ]
})

// Let's go!
study.run()