import React from 'react';
import ReactDOM from 'react-dom';
import shuffledQuestions from './questions'; 
import { List, ListItem, Typography } from '@material-ui/core';
import { Card, CardContent, Box, Stack, ListItemText } from '@mui/material';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

function Answer(props) {
    return (
        <div className = {props.quizEnded? 'hidden' : 'undefined'}>
            <ListItem button divider
                variant='outlined' 
                className='Answer' 
                onClick= {props.onClick}
                style = {props.style}
            >
            <ListItemText sx={{ textAlign: 'center' }}>{props.value}</ListItemText>
            </ListItem>
        </div>
    )
}

class Question extends React.Component {
    render() {
        console.log(this.props.score)
        let percentage = Math.floor((this.props.score / this.props.maxScore)*100);
        let message = ''
        if (this.props.score === this.props.maxScore){
            message = 'Perfect Score!';
        } else if (this.props.score > (this.props.maxScore/2)){
            message = 'Well Done!';
        } else {
            message = 'End of quiz.';
        }
        message += ` ${percentage}%`;

        return (
            <Typography variant='h5' align='center'>{this.props.quizEnded ? message : `${this.props.q}`}</Typography>
        );
    }
}

class Answers extends React.Component {

    renderAnswer(i) {
        //const style = (this.props.options[i] === this.props.correct) ? {backgroundColor: 'green'}: {} ;
        return (
            <Answer
                value = {this.props.options[i]}
                onClick = {() => this.props.onClick(this.props.options[i], this.props.correct)}
                quizEnded = {this.props.quizEnded}
                //style = {style} 
            />
            
        )
    }

    renderAnswers(numAnswers) {
        console.log(`aaa ${this.props.quizEnded}`);
        let answers = [];
        for (let i = 0; i< numAnswers; i++){
            answers.push(this.renderAnswer(i));
        }
        return answers;
    }

    render() {
        return (
            <List>
                {this.renderAnswers(this.props.options.length)}
            </List>
        );
    }
}

class Game extends React.Component {
    // If you add a state, then you can pass color to render
    
    constructor(props){
        super(props);
        const QS = shuffledQuestions();
        this.state={
            currQuestion: 0,
            questions: QS,
            quizEnded: false,
            currScore: 0,
        }
        this.state.numQuestions =  this.state.questions.length;
    }

    handleClick(value, correct) {
        let score = 0;

        if (value === correct){
            console.log('Correct!!');
            score++;
            this.setState({currScore: this.state.currScore + score});
        } else {
            console.log('Incorrect!!');
        }

        if (this.state.currQuestion + 1 >= this.state.numQuestions){
            console.log("STOP!");
            this.setState({quizEnded:true});
            return
        }
        setTimeout(console.log('test'), 10000);
        this.setState({currQuestion: this.state.currQuestion + 1});
    }

    render() {
        return (
            <ThemeProvider theme = {theme}>
            <CssBaseline/>
                <div className='game'>
                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <Card elevation='4' sx={{ minWidth: 350, maxWidth:350}} >
                            <CardContent>
                                <Question 
                                    q = {this.state.questions[this.state.currQuestion].question}
                                    num = {this.state.currQuestion}   
                                    quizEnded = {this.state.quizEnded}
                                    score = {this.state.currScore}
                                    maxScore = {this.state.numQuestions}
                                />
                                <Answers 
                                    options = {this.state.questions[this.state.currQuestion].options}
                                    correct = {this.state.questions[this.state.currQuestion].correct}
                                    onClick = {(chosenAnswer, correctAnswer) => this.handleClick(chosenAnswer, correctAnswer)}
                                    quizEnded = {this.state.quizEnded}
                                />
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography>
                                        {`Score: ${this.state.currScore}`}
                                    </Typography>
                                    <Typography>
                                        {`Question: ${this.state.currScore}/${this.state.numQuestions}`}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </ThemeProvider>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);