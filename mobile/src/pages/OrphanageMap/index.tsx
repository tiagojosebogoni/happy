import React, { useState, useCallback, useMemo } from 'react';

import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import mapMarket from '../../assets/mapMarker.png';
import {
  Container,
  MapContainer,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  ButtonCreateOrphanage,
} from './styles';

interface IOrphanage {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

const App: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  const countOrphanage = useMemo(() => {
    return orphanages.length;
  }, [orphanages]);

  const handleNavigateToOrphanageDetails = useCallback(
    (id: string) => {
      navigation.navigate('OrphanageDetails', { id });
    },
    [navigation],
  );

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, [navigation]);

  return (
    <Container>
      <MapContainer
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.0099472,
          longitude: -48.6288651,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarket}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <CalloutContainer>
                  <CalloutText>{orphanage.name}</CalloutText>
                </CalloutContainer>
              </Callout>
            </Marker>
          );
        })}
      </MapContainer>

      <Footer>
        <FooterText>{`${countOrphanage} orfanatos encontrados`}</FooterText>

        <ButtonCreateOrphanage onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </ButtonCreateOrphanage>
      </Footer>
    </Container>
  );
};

export default App;
