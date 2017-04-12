var MissingClozeException = require('./missingClozeException.js');
var fs = require('fs');

// scope-safe Cloze Delted flash card constructor:

var ClozeCard = function ClozeCard(text,cloze) {

  if (this instanceof ClozeCard) {

    this.text  = text;
    this.cloze = cloze;

  } else {

    return new ClozeCard(text,cloze);

  }

};

//get partial text without cloze text removed

ClozeCard.prototype.getPartialText = function(){
  
 var fulltext = this.text;
 var clozeDeleted = this.cloze;
 var clozeLen = this.cloze.length;
 var str = "";
 for(var i =0 ;i<clozeLen;i++){
    str = str + "_";
 }
 var clozeDeleted= fulltext.replace(clozeDeleted, str);
 //console.log(clozeDeleted);  
 return clozeDeleted;
};

//checks if cloze is missing  in the full text

ClozeCard.prototype.isClozeDeletionPresent = function(){
  
 var fulltext = this.text;
 var clozeDeleted = this.cloze;
 if(fulltext.indexOf(this.cloze) <=-1){
     throw new MissingClozeException("cloze deletion string missing in the input string");
     return false;
 }
 return true;
};

//getter for fulltext
ClozeCard.prototype.getFullText= function(){
   return this.text;
};

//getter for cloze
ClozeCard.prototype.getCloze= function(){
   return this.cloze;
};

// var cloze_card_resultArray = [];
// var firstClozeCard = ClozeCard("George Washington was the first president of United States", "George Washington");
// cloze_card_resultArray.push(firstClozeCard);
// var secondClozeCard = ClozeCard("Man landed on moon in 1969", "1969");
// cloze_card_resultArray.push(secondClozeCard);
// console.log(cloze_card_resultArray);
// console.log(firstClozeCard);
// console.log(firstClozeCard.getFullText());
// console.log(firstClozeCard.getCloze());
// console.log(firstClozeCard.isClozeDeletionPresent());
// console.log(firstClozeCard.getPartialText());
// console.log(secondClozeCard);

// fs.appendFile('./clozeDataJson.json',JSON.stringify(cloze_card_resultArray, null, 2) ,function(err){
//   if(err)
//     console.error(err);
//     console.log('Appended first!');
// });


module.exports = ClozeCard;

