/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarkerImg from '../../assets/mapMarker.png';

import {
  Container,
  ImagesContainer,
  ImageItem,
  Details,
  Title,
  MapViewStyle,
  Description,
  MapContainer,
  RoutesContainer,
  RoutesContainerText,
  Separator,
  ScheduleContainer,
  ScheduleItemBlue,
  ScheduleItemGreen,
  ScheduleItemRed,
  ScheduleTextBlue,
  ScheduleTextGreen,
  ScheduleTextRed,
  ButtonContact,
  ButtonContactText,
} from './styles';
import api from '../../services/api';

interface IOrphanageDetailsRouteParams {
  id: string;
}

interface IOrphanage {
  id: string;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: string;
    url: string;
  }>;
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<IOrphanage>();

  const params = route.params as IOrphanageDetailsRouteParams;

  useEffect(() => {
    api
      .get(`orphanages/${params.id}`)
      .then(response => setOrphanage(response.data[0]));
  }, [params.id]);

  const handleOpenGoogleMapsRoutes = useCallback(() => {
    if (orphanage) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`,
      );
    }
  }, [orphanage]);

  if (!orphanage) {
    return <View />;
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => {
            return (
              <ImageItem
                key={image.id}
                resizeMode="cover"
                source={{
                  uri: image.url,
                }}
              />
            );
          })}
        </ScrollView>
      </ImagesContainer>

      <Details>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <MapViewStyle
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            />
          </MapViewStyle>

          <RoutesContainer onPress={handleOpenGoogleMapsRoutes}>
            <RoutesContainerText>Ver rotas no Google Maps</RoutesContainerText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>{orphanage.instructions}</Title>
        <Description>
          Venha como se sentir a vontade e traga muito amor e paciência para
          dar.
        </Description>

        <ScheduleContainer>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleTextBlue>
              {`Segunda à Sexta${orphanage.opening_hours}`}
            </ScheduleTextBlue>
          </ScheduleItemBlue>
          {orphanage.open_on_weekends ? (
            <ScheduleItemGreen>
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleTextGreen>Atendemos fim de semana</ScheduleTextGreen>
            </ScheduleItemGreen>
          ) : (
            <ScheduleItemRed>
              <Feather name="info" size={40} color="#ff669d" />
              <ScheduleTextRed>Não atendemos fim de semana</ScheduleTextRed>
            </ScheduleItemRed>
          )}
        </ScheduleContainer>

        <ButtonContact>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ButtonContactText>Entrar em contato</ButtonContactText>
        </ButtonContact>
      </Details>
    </Container>
  );
};

export default OrphanageDetails;
