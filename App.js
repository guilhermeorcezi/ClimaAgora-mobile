import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
	return (
		<SafeAreaView>
			<LinearGradient
				colors={['rgba(11,173,189,1)', 'rgba(0,97,249,1)']}
				start={[0.1, 0.5]}
				end={[1, 2]}
				style={styles.container}
			>
				<View style={styles.content}>
					<Text>OI PORRA DO CARL</Text>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		minHeight: '100%'
	},

	content: {
    marginHorizontal: 20,
    borderRadius: 4,
    padding:10,
		marginVertical:80,
		backgroundColor: '#FFF'
	}
});
