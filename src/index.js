import React from 'react';
import ReactDOM from 'react-dom';
import shuffledQuestions from './questions'; 
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Card, CardContent, Box, 
    Stack, ListItemText, List, ListItem, Typography} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { greenTheme, purpleTheme, pinkTheme } from './theme'


function Answer(props) {
    return (
        <div className = {props.quizEnded? 'hidden' : 'undefined'}>
            <ListItem button divider
                variant='outlined' 
                className='Answer' 
                onClick= {props.onClick}
                style = {props.style}
                disabled={props.clicked}
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
                //clicked = {this.props.clicked} 
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

class Settings extends React.Component {
    render() {

        const themeOptions = [{
            title: 'Green',
            theme: greenTheme,
            color: '#e4f0e2'
        },
        {
            title: 'Purple',
            theme: purpleTheme,
            color: '#eee2f0'
        },
        {
            title: 'Pink',
            theme: pinkTheme,
            color: '#ffabc7'
        },
        ]   

        return (
            <div>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
            {themeOptions.map((theme) => (
                <SpeedDialAction
                sx = {'background-color: ' + theme.color}
                onClick= {() => {this.props.onClick(theme.theme)}}
                tooltipTitle={theme.title}
                />
            ))}
            </SpeedDial>
            </div>
        )
    }
}

class Game extends React.Component {
    // If you add a history state, then you can pass color to render

    changeTheme(chosenTheme) {
        this.setState({theme: chosenTheme})
    }

    constructor(props){
        super(props);
        const QS = shuffledQuestions();
        this.state={
            currQuestion: 0,
            questions: QS,
            quizEnded: false,
            currScore: 0,
            theme: greenTheme
        }
        this.state.numQuestions =  this.state.questions.length;
    }

    handleClick(value, correct) {
        
        let score = 0;

        if (value === correct){
            console.log('Correct!!');
            score++;
            this.setState({currScore: this.state.currScore + score});
        }

        if (this.state.currQuestion + 1 >= this.state.numQuestions){
            this.setState({quizEnded:true});
            return
        }
        //setTimeout(() => {this.setState({currQuestion: this.state.currQuestion + 1})}, 500);
        this.setState({currQuestion: this.state.currQuestion + 1})
    }

    render() {
        return (
            <ThemeProvider theme = {this.state.theme}>
            <CssBaseline/>
                <div className='game'>
                    <Settings 
                        onClick={(chosenTheme) => {this.changeTheme(chosenTheme)}}
                    />
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