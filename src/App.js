
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Button,
  Text,
} from 'react-native';

import { quizData } from './data/quizData';


class App extends Component {
  constructor(props) {
	super(props);
	this.state = {
		currentQuestion: 0,
		myAnswer: null,
		answer:'',
		options: [],
		score: 0,
		disabled: true,
		isEnd: false
	};
  }
  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
		console.log('respuesta:'+answer);
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };

  render() {
	const { options, myAnswer, currentQuestion, isEnd } = this.state;
    if (isEnd) {
		
      return (
		<SafeAreaView style={{flex: 1}}>		
        <View>
          <Text>Game Over your Final score is {this.state.score} points </Text>
          <Text>
            The correct answer's for the questions was</Text>
			<FlatList 
				data={quizData}
				keyExtractor={item => item.id.toString()}
				renderItem={({item})=>(
					<View style={{justifyContent:'center',marginBottom:10}}>
					<Text style={{backgroundColor:'blue',color:'white',padding:10}}>
					{item.answer}
					</Text>
					</View>
				)}				
			/>			            
        </View>
		</SafeAreaView>
      );
    } else {
      return (
		<SafeAreaView>
			<ScrollView>
        <View>
          <Text>{this.state.questions} </Text>
          <Text>{`Questions ${currentQuestion}  out of ${quizData.length - 1} remaining `}</Text>
		  
          {options.length > 0 && options.map((option,index) => (			
            <Text
			  key={index}
			  style={[styles.text,myAnswer === option ? styles.selected : null]}
              onPress={() => this.checkAnswer(option)}
            >
              {option}
            </Text>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <Button
              title={'Next'}
              disabled={this.state.disabled}
              onPress={this.nextQuestionHandler}
            />
          )}
          {/* //adding a finish button */}
          {currentQuestion === quizData.length - 1 && (
            <Button title={'Finish'} onPress={this.finishHandler} />
          )}
        </View>
		</ScrollView>
		</SafeAreaView>
      );
    }
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#9FEFCA',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  selected:{
	  color: '#FF0000',
  },
  text:{
	  marginTop: 10,
	  marginBottom: 10,
	  padding:15,
	  backgroundColor: '#00ffaa',

  }
});

export default App;
