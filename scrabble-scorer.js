// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  
      for (const pointValue in oldPointStructure) {
		//  console.log(pointValue);
         if (oldPointStructure[pointValue].includes(word[i])) {
			
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!"); 
  let userWord = input.question("Enter a word: ");
//   let score = oldScrabbleScorer(userWord);
//   console.log(score);
  return userWord;
};

let simpleScorer = function (word) {
   return word.length;
};

let vowelBonusScorer = function (word) {
   let score = 0;
   for(let i = 0; i < word.length; i++) {
     if(word[i].toLowerCase() === 'a'||
     word[i].toLowerCase() === 'e'||
     word[i].toLowerCase() === 'i'||
     word[i].toLowerCase() === 'o'||
     word[i].toLowerCase() === 'u') {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 };

let scrabbleScorer = function (word, structure = newPointStructure) {
   let score = 0;
   for(let i = 0; i < word.length; i++) {
     score += Number(structure[word[i].toLowerCase()]);
   }
   return score;
 };

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
    },
    {
      name: "Bonus Vowels",
      description: "Vowels are 3pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
    },
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
    },
  ];

function scorerPrompt() {
   let algorithmInput = input.question(`Which scoring algorithm would you like to use? \n
    0 - ${scoringAlgorithms[0].name}:${scoringAlgorithms[0].description}
    1 - ${scoringAlgorithms[1].name}:${scoringAlgorithms[1].description}
    2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
    \nEnter 0, 1, or 2: `);
//use while loop instead to handle validation, reduce conditional logic to single return statement 
    if(algorithmInput === '0') {
      return scoringAlgorithms[0]
    } else if(algorithmInput === '1') {
      return scoringAlgorithms[1]
    } else if (algorithmInput === '2') {
      return scoringAlgorithms[2]
    } else {
      console.log('Invaild number');
      scorerPrompt();
   }
}

function transform(structure) {
   let newStructure = {};
   for(let num in structure) {
     for(let i = 0; i < structure[num].length; i++) {
       newStructure[structure[num][i].toLowerCase()] = Number(num);
     }
   }
   return newStructure;
 };

let newPointStructure = transform(oldPointStructure);

function runProgram() {
// initialPrompt();
// console.log(scorerPrompt().scoringFunction(""));
// }

let userWord = initialPrompt();
let score = scorerPrompt().scorerFunction(userWord)
console.log(`Score for ${userWord} is ${score}`);  
}





// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
