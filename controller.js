var inquirer = require('inquirer');
var BasicCard = require('./basicFlashCard.js');
var ClozeCard = require('./cloze-deletedFlashCard.js');
var fs = require('fs');

/**
 * User will presented with 2 options. Select from below options
 * 1) CREATE A BASIC FLASHCARD  
 * 2) CREATE A CLOZE DELETED FLASHCARD  
 * 3) VIEW BASIC FLASHCARDS
 * 4) VIEW CLOZE DELETED FLASHCARDS
 * */


//Questions Array

var questions_array =     [{
    type: "list",
    name: "action",
    message: "Please select your option?",
    choices: [
      "CREATE A BASIC FLASHCARD",
       new inquirer.Separator(), 
      "CREATE A CLOZE DELETED FLASHCARD",
       new inquirer.Separator(), 
      "PLAY BASIC FLASHCARDS",
       new inquirer.Separator(), 
      "PLAY CLOZE DELETED FLASHCARDS",
       new inquirer.Separator(), 
      "EXIT APPLICATION",
            
     ]
    }];

/**
 * Define askuser function to prompt with 4 user options as a list to select 
 */
function askuser(){

    inquirer.prompt(questions_array).then(function(answers){
        
    //Delegate to specific js functions based on user choice
        switch(answers.action) {
            case "CREATE A BASIC FLASHCARD":
                 inquirer.prompt([
               {
                   name : "front",
                   message : "enter your question statement",
                   type: "input"

               },
               {
                   name : "back",
                   message : "enter answer to your question",
                   type: "input"

               }
              ]).then(function(answers){
                  fs.readFile('./basicDataJson.json','utf8' ,function(err,data){
                        if(err)
                            console.error(err);
                            //console.log(data);
                            var jsonData = JSON.parse(data);
                            var createBasicCard = BasicCard(answers.front, answers.back);
                            jsonData.push(createBasicCard);
                            fs.writeFile('./basicDataJson.json',JSON.stringify(jsonData, null, 2) ,function(err){
                            if(err)
                            console.error(err);
                            //console.log('written basic card to json file!');
                            });
                    askuser();                        
                   });
              });                
              break;
            case "CREATE A CLOZE DELETED FLASHCARD":
                    inquirer.prompt([
                    {
                        name : "fulltext",
                        message : "enter your question statement with cloze text",
                        type: "input"

                    },
                    {
                        name : "cloze",
                        message : "enter your cloze text",
                        type: "input"

                    }
                    ]).then(function(answers){
                        fs.readFile('./clozeDataJson.json','utf8' ,function(err,data){
                                if(err)
                                    console.error(err);
                                    //console.log(data);
                                    var jsonData = JSON.parse(data);
                                    var createClozeCard = ClozeCard(answers.fulltext, answers.cloze);
                                    jsonData.push(createClozeCard);
                                    fs.writeFile('./clozeDataJson.json',JSON.stringify(jsonData, null, 2) ,function(err){
                                    if(err)
                                    console.error(err);
                                    //console.log('written cloze card to json file!');
                                    });
                            askuser();                        
                        });
                    });    
                
                break;
            case "PLAY BASIC FLASHCARDS":
                fs.readFile('./basicDataJson.json','utf8' ,function(err,data){
                if(err)
                console.error(err);
                //console.log(data);
                var jsonData = JSON.parse(data);
                var len = jsonData.length;
                var i =0;
                basicCardPrompt(jsonData,len,i);
                });//read json file ends here
                break;
            case "PLAY CLOZE DELETED FLASHCARDS":
                fs.readFile('./clozeDataJson.json','utf8' ,function(err,data){
                if(err)
                console.error(err);
                //console.log(data);
                var jsonData = JSON.parse(data);
                var len = jsonData.length;
                var i =0;
                clozeCardPrompt(jsonData,len,i);
                });//read json file ends here
                   break;
            case "EXIT APPLICATION":
                console.log("Vist us again...Good Bye!");
                break;
            default:
                break;
        }

         
    });

} /**askuser function ends */

//Invoke askuser function
askuser();
    
/**
 * cloze card recursive function
 */

function clozeCardPrompt(jsonData,len,i){
    var element = jsonData[i];
    i = i+1;
    //console.log(element);
    var clozeCardObject = ClozeCard(element.text,element.cloze);
    var partialText = clozeCardObject.getPartialText();
    var clozeText = clozeCardObject.getCloze();
    inquirer.prompt([
    {
        name : "getCloze",
        message : "Question - "+ partialText,
        type: "input"
    }
    ]).then(function(answers){
        if(answers.getCloze.toLowerCase().trim() === clozeText.toLowerCase().trim()){
        console.log("Correct Answer");
        }else{
        console.log("Wrong Answer");
        }
        inquirer.prompt([
        {
            name : "action",
            message : "select your option",
            type: "list",
            choices: ["continue playing cloze flashcards...",
                        new inquirer.Separator(), 
                        "exit play cloze flash cards section..."
                        ]

        }
        ]).then(function(answers){
            if(answers.action === "continue playing cloze flashcards..." ){
                console.log("user wants to move to next question...");
                if(i<len){
                clozeCardPrompt(jsonData,len,i);
                }else{
                console.log("Great you have completed all the questions!");
                askuser();
                }
            }else if(answers.action === "exit play cloze flash cards section..."){
                askuser();
            }
              
        });//inner prompt ends

    });//outer prompt ends
}; /**clove user prompt ends here*/

/**
 * Basic Card recursive function
 */
function basicCardPrompt(jsonData,len,i){
    var element = jsonData[i];
    i = i+1;
    //console.log(element);
    var basicCardObject = BasicCard(element.front,element.back);
    var front = basicCardObject.getFrontText();
    var back = basicCardObject.getBackText();
    inquirer.prompt([
    {
        name : "getBasic",
        message : "Question - "+ front,
        type: "input"
    }
    ]).then(function(answers){
        if(answers.getBasic.toLowerCase().trim() === back.toLowerCase().trim()){
        console.log("Correct Answer");
        }else{
        console.log("Wrong Answer");
        }
        inquirer.prompt([
        {
            name : "action",
            message : "select your option",
            type: "list",
            choices: ["continue playing basic flashcards...",
                        new inquirer.Separator(), 
                        "exit play basic flash cards section..."
                        ]

        }
        ]).then(function(answers){
            if(answers.action === "continue playing basic flashcards..." ){
                console.log("user wants to move to next question...");
                if(i<len){
                basicCardPrompt(jsonData,len,i);
                }else{
                console.log("you completed all the questions!");
                askuser();
                }
            }else if(answers.action === "exit play basic flash cards section..."){
                askuser();
            }
              
        });//inner prompt ends

    });//outer prompt ends
}; /**clove user prompt ends here*/
                                       
                                       
                                       