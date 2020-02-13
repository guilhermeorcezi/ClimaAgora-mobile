import React from 'react';
import { View, StyleSheet } from 'react-native';

import InfoView from './InfoView'

export default function ActivatedCity({ city = {} }) {
  return (
    <View style={styles.content}>
      <InfoView
        dataTitle="LOCALIZAÇÃO"
        name={city.name}
        iconName="map-marker"
      />

      <InfoView
        dataTitle="TEMPERATURA"
        name={`${city.temp}°C`}
        iconName={city.temp > 28 ? 'thermometer-full' : 'thermometer-half'}
      />

      <InfoView
        dataTitle="SENSAÇÃO TÉRMICA"
        name={`${city.feels_like}°C`}
        iconName={city.temp > 28 ? 'sun-o' : 'cloud'}
      />

      <InfoView
        dataTitle="UMIDADE"
        name={`${city.humidity}%`}
        iconName="tint"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    borderRadius: 4,
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#FFF',
    paddingTop: 40
  },
});