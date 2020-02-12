import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Keyboard,
	Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import GeoCoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default function App() {
	const [city, setCity] = useState('');
	const [inputCity, setInputCity] = useState('');

	useEffect(() => {
		setInputCity('');
	}, [setCity]);
	/*
	useEffect(() => {
		require('dotenv').config();
		function getData() {
			GeoCoder.init(`${process.env.API_KEY}`);
			GeoCoder.from(28.6139, 77.209).then(
				(json) => {
					var adress_component = json.results[0];
					console.log(adress_component);
				},
				(error) => {
					console.log(error);
				}
			);
		}
		getData();
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position.coords.latitude, position.coords.longitude);
			GeoCoder.init('AIzaSyD_S55kWjsN8sMqylq9pbG9p8046a8LtF4');
			GeoCoder.from(position.coords.latitude, position.coords.longitude)
				.then((json) => {
					console.log(json);

					var addressComponent = json.results[0].address_components;
					console.log(addressComponent);
				})
				.catch((error) => console.log(error));
		}); 
	}, []); */

	async function handleSubmit() {
		try {
			const response = await axios.get(
				`http://api.openweathermap.org/data/2.5/weather?q=${inputCity},br&appid=531a125eabbef01c0a15891c5e5f73b9&units=metric`
			);

			const {
				name,
				main: { temp, feels_like, humidity }
			} = response.data;

			Keyboard.dismiss();
			await setCity({ name, temp, feels_like, humidity, activated: true });
		} catch (err) {
			Alert.alert('Oops...', 'Cidade não encontrada!', [
				{ text: 'Tentar Novamente' }
			]);
		}
	}

	return (
		<SafeAreaView>
			<ImageBackground
				style={styles.container}
				source={require('./src/assets/bg.png')}
			>
				<Text style={styles.textTitle}>CLIMA AGORA</Text>
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Digite uma cidade"
						placeholderTextColor="#999"
						keyboardType="default"
						autoCorrect
						z={inputCity}
						onChangeText={setInputCity}
						onSubmitEditing={handleSubmit}
					></TextInput>
					<TouchableOpacity onPress={handleSubmit} style={styles.button}>
						<Text style={styles.buttonText}>VERIFICAR</Text>
					</TouchableOpacity>
				</View>
				{city.activated ? (
					<View style={styles.content}>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>LOCALIZAÇÃO</Text>
							<View style={styles.dataIcon}>
								<Text style={styles.data}>{city.name} </Text>
								<Icon
									name="map-marker"
									color="#114b70"
									size={20}
									type="font-awesome"
									style={styles.icon}
								/>
							</View>
						</View>

						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>TEMPERATURA</Text>
							<View style={styles.dataIcon}>
								<Text style={styles.data}>{city.temp}°C </Text>
								<Icon
									name={
										city.temp > 28 ? 'thermometer-full' : 'thermometer-half'
									}
									type="font-awesome"
									color="#114b70"
									size={20}
									style={styles.icon}
								/>
							</View>
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>SENSAÇÃO TÉRMICA</Text>
							<View style={styles.dataIcon}>
								<Text style={styles.data}>{city.feels_like}°C </Text>
								<Icon
									name={city.temp > 28 ? 'sun-o' : 'cloud'}
									type="font-awesome"
									color="#114b70"
									size={20}
									style={{ marginTop: 50 }}
								/>
							</View>
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>UMIDADE</Text>

							<View style={styles.dataIcon}>
								<Text style={styles.data}>{city.humidity}% </Text>
								<Icon
									name="tint"
									type="font-awesome"
									color="#114b70"
									size={20}
								/>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.empty}>
						<Text style={styles.emptyText}>Procure por uma cidade</Text>
					</View>
				)}
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		minHeight: '100%'
	},

	textTitle: {
		paddingTop: 0,
		textAlign: 'center',
		fontSize: 24,
		color: '#FFF',
		fontWeight: 'bold',
		paddingTop: 50,
		letterSpacing: 5,
		marginBottom: 20
	},

	form: {
		marginHorizontal: 20,
		borderRadius: 4,
		padding: 10,
		paddingBottom: 3,
		marginVertical: 5,
		backgroundColor: '#FFF'
	},

	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		borderRadius: 2,
		marginBottom: 10
	},

	button: {
		height: 42,
		backgroundColor: '#114b70',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 50,
		paddingHorizontal: 100,
		marginBottom: 5
	},

	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
	},

	content: {
		marginHorizontal: 20,
		borderRadius: 4,
		padding: 10,
		marginVertical: 20,
		backgroundColor: '#FFF',
		paddingTop: 40
	},

	dataContent: {
		marginBottom: 30,
		alignItems: 'center',
		alignContent: 'center'
	},

	dataIcon: {
		flexDirection: 'row'
	},

	dataTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#114b70',
		letterSpacing: 6,
		marginBottom: 5
	},

	data: {
		textAlign: 'center',
		fontSize: 18,
		color: '#666',
		marginRight: 5
	},

	empty: {
		backgroundColor: '#FFF',
		borderRadius: 4,
		alignContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		padding: 10,
		marginVertical: 20
	},

	emptyText: {
		color: '#666'
	}
});
