import React,{ Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button, SafeAreaView, ScrollView } from 'react-native'

import { quizData } from '../data/quizData';

class Home extends Component {
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
	}

	checkAnswer = answer => {
		this.setState({ myAnswer: answer, disabled: false });
	  };

	finishHandler = () => {
		if (this.state.currentQuestion === quizData.length - 1) {
			this.props.navigation.navigate('Detail', { item: this.state.score })
		}
	  };
	nextQuestionHandler = () => {
		const { myAnswer, answer, score } = this.state;

		if (myAnswer === answer) {
			this.setState({
				score: score + 1
			});
		}

		this.setState({
			currentQuestion: this.state.currentQuestion + 1
		});
	};

	componentDidMount() {
		this.loadQuizData();
	}

	
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

	render() {
		const { options, myAnswer, currentQuestion } = this.state;
		return (
			<SafeAreaView>
				<ScrollView>
					<View style={{paddingLeft:5,paddingRight:5}}>
						<Text style={styles.text_question}>{`${currentQuestion +1}`}.-{this.state.questions} </Text>
						<Text style={styles.text_message}>{`Preguntas ${currentQuestion}  de ${quizData.length - 1 } restantes `}</Text>
						<View style={styles.border} />
						<View style={styles.container}> 
							{options.length > 0 && options.map((option, index) => (
								<TouchableOpacity onPress={() => this.checkAnswer(option)} key={index}>
									<Text style={[styles.text, myAnswer === option ? styles.text_selected : null]}>
							{index+1} .- {option}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						{currentQuestion < quizData.length - 1 && (							
							<Button
								title={'Siguiente'}
								color="#002c3e"																
								disabled={this.state.disabled}								
								onPress={this.nextQuestionHandler} />								
						)}						
						{currentQuestion === quizData.length - 1 && (							
							<TouchableOpacity
								style={styles.buttonContainer}
								onPress={this.finishHandler}>
								<Text style={styles.buttonText}>Finish</Text>
							</TouchableOpacity>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

/* const character = {
  name: 'Luke Skywalker',
  home: 'Tatooine',
  species: 'human'
} */



/* 
function Home(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Detail', { item: character })}>
        <Text style={styles.buttonText}>Who is {character.name}?</Text>
      </TouchableOpacity>
    </View>
  )
} */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch',
		marginBottom: 50,
	},
	text: {
		color: '#002c3e',
		backgroundColor: '#f7f8f3',
		fontSize: 24,		
		marginTop: 5,
		marginBottom: 5,
		padding:15,
		width: '100%',
		textAlign: 'center', 
		alignSelf: 'stretch',
		borderStyle: 'dotted',
		borderWidth: 2,
		borderColor: '#002c3e',
	},
	text_message: {
		color: '#78bcc4',
		fontSize: 16,
		marginBottom: 10,
		fontWeight: 'bold',
		
	},
	text_question: {
		color: '#f7444e',
		fontSize: 26,
		marginTop: 10,
		marginBottom: 10,
		
	},
	text_selected:{
		color: '#000',
		backgroundColor: '#f7444e',
	},
	buttonContainer: {
		backgroundColor: '#002c3e',
		borderRadius: 5,
		padding: 10,
		margin: 20,
		alignContent:'center',
		alignItems:'center',
	},
	buttonText: {
		color: '#f7f8f3',
		fontSize:18,
		alignContent:'center',
		alignItems:'center',
		fontWeight: 'bold',
	},
	border:{
		flex:0.28,
		borderBottomWidth: 2,
		borderBottomColor: '#78bcc4',
		marginBottom:5,
	  },
})

export default Home