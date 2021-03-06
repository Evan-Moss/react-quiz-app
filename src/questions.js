const QUESTIONS = [{
    question: 'What is the Capital of đ´ó §ó ˘ó ˇó Źó łó ż?',
    options: ['Cardiff', 'London', 'Edinburgh'],
    correct: 'Cardiff'
},
{
    question: 'What is the Capital of đ´ó §ó ˘ó Ľó Žó §ó ż?',
    options: ['Cardiff', 'London', 'Edinburgh', 'Belfast'],
    correct: 'London'
},
{
    question: 'What country is đšđˇ?',
    options: ['Turkey', 'Lebanon', 'Egypt', 'Germany'],
    correct: 'Turkey'
},
{
    question: 'Which Flag is Belarus?',
    options: ['đ¨đż', 'đ§đž', 'đŽđą', 'đšđ˛'],
    correct: 'đ§đž'
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