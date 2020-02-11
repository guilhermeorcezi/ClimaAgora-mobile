import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Keyboard
} from 'react-native';
import { Icon } from 'react-native-elements';
import GeoCoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Alert } from 'react-native';

export default function App() {
	const [city, setCity] = useState('');

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
				`http://api.openweathermap.org/data/2.5/weather?q=${city},br&appid=531a125eabbef01c0a15891c5e5f73b9&units=metric`
			);

			const {
				name,
				main: { temp, feels_like, humidity }
			} = response.data;

			Keyboard.dismiss();
			await setCity({ name, temp, feels_like, humidity, activated: true });
		} catch (err) {
			Alert.alert('Cidade não existe');
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
						data={city}
						onChangeText={setCity}
					></TextInput>
					<TouchableOpacity onPress={handleSubmit} style={styles.button}>
						<Text style={styles.buttonText}>VERIFICAR</Text>
					</TouchableOpacity>
				</View>
				{city.activated ? (
					<View style={styles.content}>
						<View style={styles.dataContent}>
							<View style={styles.dataIcon}>
								<Text style={styles.dataTitle}>LOCALIZAÇÃO</Text>
								<Icon
									name="map-marker"
									color="#114b70"
									size={18}
									type="font-awesome"
								/>
							</View>
							<Text style={styles.data}>{city.name}</Text>
						</View>

						<View style={styles.dataContent}>
							<View style={styles.dataIcon}>
								<Text style={styles.dataTitle}>TEMPERATURA</Text>
								<Icon
									name={
										city.temp > 28 ? 'thermometer-full' : 'thermometer-half'
									}
									type="font-awesome"
									color="#114b70"
									size={18}
								/>
							</View>
							<Text style={styles.data}>{city.temp}°C</Text>
						</View>
						<View style={styles.dataContent}>
							<View style={styles.dataIcon}>
								<Text style={styles.dataTitle}>SENSAÇÃO TÉRMICA</Text>
								<Icon
									name={city.temp > 28 ? 'sun-o' : 'cloud'}
									type="font-awesome"
									color="#114b70"
									size={18}
								/>
							</View>
							<Text style={styles.data}>{city.feels_like}°C</Text>
						</View>
						<View style={styles.dataContent}>
							<View style={styles.dataIcon}>
								<Text style={styles.dataTitle}>UMIDADE</Text>
								<Icon
									name="tint"
									type="font-awesome"
									color="#114b70"
									size={18}
								/>
							</View>
							<Text style={styles.data}>{city.humidity}%</Text>
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

	content: {
		marginHorizontal: 20,
		borderRadius: 4,
		padding: 10,
		marginVertical: 20,
		backgroundColor: '#FFF',
		paddingTop: 40
	},

	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20,
		borderRadius: 2
	},
	button: {
		height: 42,
		backgroundColor: 'rgba(0,97,249,1)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		marginBottom: 10
	},

	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
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
		letterSpacing: 6
	},

	data: {
		textAlign: 'center',
		fontSize: 18,
		color: '#666'
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
