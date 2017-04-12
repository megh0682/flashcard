var fs = require('fs');
// scope-safe basic flash card constructor:

var BasicCard = function BasicCard(front,back) {

  if (this instanceof BasicCard) {

    this.front  = front;
    this.back = back;

  } else {

    return new BasicCard(front,back);

  }

};

//getter for front
BasicCard.prototype.getFrontText= function(){
   return this.front;
};

//getter for back
BasicCard.prototype.getBackText= function(){
   return this.back;
};


// var secondBasicCard = BasicCard("When did man first landed on moon?", "1969");
// basic_card_resultArray.push(secondBasicCard);
// console.log(basic_card_resultArray);
// console.log(firstBasicCard);
// console.log(firstBasicCard.getFrontText());
// console.log(firstBasicCard.getBackText());
// console.log(firstClozeCard.getCloze());
// console.log(firstClozeCard.isClozeDeletionPresent());
// console.log(firstClozeCard.getPartialText());
// console.log(secondClozeCard);

//read json basicDataJson

module.exports = BasicCard;



