import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyCity() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Procure por uma cidade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
})