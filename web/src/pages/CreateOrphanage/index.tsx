/* eslint-disable camelcase */
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiPlus, FiX } from 'react-icons/fi';

import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';
import mapIcon from '../../utils/mapIcon';
import Sidebar from '../../components/Sidebar';

import {
  Container,
  Main,
  Form,
  InputContainer,
  ButtonConfirm,
  NewImage,
  ImageContainer,
  ButtonClose,
  ButtonSelect,
} from './styles';
import api from '../../services/api';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { latitude, longitude } = position;

      const data = new FormData();

      data.append('name', name);
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      images.forEach(image => {
        data.append('images', image);
      });

      await api.post('orphanages', data);
      alert('Cadastro realizado com sucesso!');

      history.push('/app');
    },
    [
      about,
      images,
      name,
      open_on_weekends,
      opening_hours,
      position,
      instructions,
      history,
    ],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setPreviewImages([...previewImages, ...selectedImagesPreview]);
    },
    [previewImages],
  );

  const handleRemoveImageIndex = useCallback(
    (indice: number) => {
      setPreviewImages(
        previewImages.filter((image, index) => index !== indice),
      );
    },

    [previewImages],
  );
  return (
    <Container>
      <Sidebar />

      <Main>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputContainer>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="images">Fotos</label>

              <div>
                {previewImages.map((image, index) => {
                  return (
                    <ImageContainer key={image}>
                      <img src={image} alt={name} />

                      <ButtonClose
                        onClick={() => {
                          handleRemoveImageIndex(index);
                        }}
                      >
                        <FiX size={24} color="#ff669d" />
                      </ButtonClose>
                    </ImageContainer>
                  );
                })}
                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </InputContainer>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputContainer>
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </ButtonSelect>
            </InputContainer>
          </fieldset>

          <ButtonConfirm type="submit">Confirmar</ButtonConfirm>
        </Form>
      </Main>
    </Container>
  );
};

export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
