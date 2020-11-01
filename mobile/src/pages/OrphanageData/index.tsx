/* eslint-disable camelcase */
import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Title,
  Label,
  Input,
  UploadImagesContainer,
  UploadImage,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';
import api from '../../services/api';

interface IOrphanageRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const routes = useRoute();
  const params = routes.params as IOrphanageRouteParams;

  const handleCreateOrphanage = useCallback(async () => {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);
    navigation.navigate('OrphanageMap');
  }, [
    about,
    images,
    instructions,
    name,
    navigation,
    open_on_weekends,
    opening_hours,
    params.position,
  ]);

  const handleSelectedImages = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }
    const { uri: image } = result;

    setImages([...images, image]);
  }, [images]);

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input value={name} onChangeText={text => setName(text)} />

      <Label>Sobre</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={about}
        onChangeText={text => setAbout(text)}
      />

      <Label>Fotos</Label>
      <UploadImagesContainer>
        {images.map(image => {
          return <UploadImage source={{ uri: image }} key={image} />;
        })}
      </UploadImagesContainer>

      <ImagesInput onPress={handleSelectedImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input
        style={{ height: 110 }}
        multiline
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />

      <Label>Horario de visitas</Label>
      <Input
        value={opening_hours}
        onChangeText={text => setOpeningHours(text)}
      />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={flag => setOpenOnWeekends(flag)}
        />
      </SwitchContainer>

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default OrphanageData;
