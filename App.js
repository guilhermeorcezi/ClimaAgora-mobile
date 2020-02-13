import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	Keyboard,
	Alert
} from 'react-native';
import axios from 'axios';

import Form from './src/components/Form';
import ActivatedCity from './src/components/ActivatedCity';
import EmptyCity from './src/components/EmptyCity';

export default function App() {
	const [city, setCity] = useState('');
	const [inputCity, setInputCity] = useState('');

	useEffect(() => {
		setInputCity('');
	}, [setCity]);

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
			setCity({ name, temp, feels_like, humidity, activated: true });
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
				
				<Form 
					value={inputCity} 
					onChange={setInputCity} 
					onSubmit={handleSubmit} 
				/>

				{city.activated ? (
					<ActivatedCity 
						city={city} 
					/>
				) : (
					<EmptyCity />
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
});
