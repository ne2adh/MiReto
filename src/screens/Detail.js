import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { quizData } from '../data/quizData';

export default class Detail extends Component {
	render() {

		const { route, navigation } = this.props
		const { item } = route.params
		return (
			
				<View style={{flex: 1}}>
					<View style={{padding:5}}>
						<Text style={styles.resumen}>Juego sobre su puntaje final es de {item} puntos </Text>
						<Text style={styles.resumen2}>La respuesta correcta para las preguntas fueron:</Text>
						<View style={styles.border} />
					</View>
					<ScrollView>
						<View>
							<FlatList
								data={quizData}
								keyExtractor={item => item.id.toString()}
								renderItem={({ item, index }) => (
									<View style={{ justifyContent: 'center', marginBottom: 5 }}>
										<Text style={{color:'#002c3e',fontSize:10, paddingLeft:5}}>{index + 1}.-{item.question}</Text>
										<Text style={{  borderBottomWidth: 1, borderBottomColor: '#f7444e',color: '#f7444e', padding: 5,fontWeight: 'bold' }}>
											{item.answer}
										</Text>
									</View>
								)}
							/>
						</View>
					</ScrollView>
					<View>
						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => navigation.navigate('Home')}>
							<Text style={styles.buttonText}>JUGAR DE NUEVO</Text>
						</TouchableOpacity>
					</View>
				</View>
		);
	}
}


/* 

function Detail(props) {
  const { route, navigation } = props
  const { item } = route.params
  const { name, home, species } = item
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {name}</Text>
        <Text style={styles.cardText}>Home Planet: {home}</Text>
        <Text style={styles.cardText}>Species: {species}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  )
} */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f7f8f3'
	},
	resumen: {
		color: '#002c3e',
		fontSize: 18,
		fontWeight: 'bold',		
	},
	resumen2: {
		color: '#78bcc4',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign:'left',
	},	
	buttonContainer: {
		backgroundColor: '#f7444e',
		borderRadius: 5,
		padding: 10,
		margin: 20,
		alignContent:'center',
		alignItems:'center',
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
		alignContent:'center',
		alignItems:'center',
		
	},
	border:{
		flex:0.28,
		borderBottomWidth: 2,
		borderBottomColor: '#78bcc4',
		marginBottom:15,
	  },
})