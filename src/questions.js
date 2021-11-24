const QUESTIONS = [{
    question: 'What is the Capital of 🏴󠁧󠁢󠁷󠁬󠁳󠁿?',
    options: ['Cardiff', 'London', 'Edinburgh'],
    correct: 'Cardiff'
},
{
    question: 'What is the Capital of 🏴󠁧󠁢󠁥󠁮󠁧󠁿?',
    options: ['Cardiff', 'London', 'Edinburgh', 'Belfast'],
    correct: 'London'
},
{
    question: 'What country is 🇹🇷?',
    options: ['Turkey', 'Lebanon', 'Egypt', 'Germany'],
    correct: 'Turkey'
},
{
    question: 'Which Flag is Belarus?',
    options: ['🇨🇿', '🇧🇾', '🇮🇱', '🇹🇲'],
    correct: '🇧🇾'
}
];

const shuffledQuestions = (numQuestions=QUESTIONS.length) => {

    if (numQuestions > QUESTIONS.length) { numQuestions=QUESTIONS.length}

    let questionKeys = [...Array(QUESTIONS.length).keys()];    
    let returnQuestions = []

    for (let i = 0; i<numQuestions; i++) {
        let randomIndex = Math.floor(Math.random()*questionKeys.length);
        returnQuestions.push(QUESTIONS[questionKeys[randomIndex]]);
        questionKeys.splice(randomIndex,1);
    }

    return returnQuestions
}

//console.log(shuffleQuestions());

export default shuffledQuestions;