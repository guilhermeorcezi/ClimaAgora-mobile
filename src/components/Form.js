import React from 'react';
import {
	View,
	Text,
	TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Form({value, onChange, onSubmit}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma cidade"
        placeholderTextColor="#999"
        keyboardType="default"
        autoCorrect
        z={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
      ></TextInput>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>VERIFICAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
