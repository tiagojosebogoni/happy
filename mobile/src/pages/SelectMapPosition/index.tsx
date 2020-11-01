import React, { useCallback, useState } from 'react';

import { MapEvent, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import mapMarkerImg from '../../assets/mapMarker.png';

import { Container, MapViewStyle, NextButton, NextButtonText } from './styles';

const SelectMapPosition = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <MapViewStyle
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapViewStyle>

      {position.latitude !== 0 && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};

export default SelectMapPosition;
