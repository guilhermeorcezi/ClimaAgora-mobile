import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function InfoView({dataTitle, name, iconName}) {
  return (
    <View style={styles.dataContent}>
      <Text style={styles.dataTitle}>{dataTitle}</Text>
      <View style={styles.dataIcon}>
        <Text style={styles.data}>{name} </Text>
        <Icon
          name={iconName}
          color="#114b70"
          size={20}
          type="font-awesome"
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});