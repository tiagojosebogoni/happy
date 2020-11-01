import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { useParams } from 'react-router-dom';
import {
  Container,
  Main,
  OrphanageDetail,
  ContainerImages,
  OrphanageDetailContent,
  MapContainer,
  OpenDetails,
  Hour,
  OpenOnWeekends,
  ButtonContact,
} from './style';
import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

interface IOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: string;
    url: string;
  }>;
}

interface IOrphanageParams {
  id: string;
}

const Orphanage: React.FC = () => {
  const params = useParams<IOrphanageParams>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [orphanage, setOrphanage] = useState<IOrphanage>();

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data[0]);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Sidebar />

      <Main>
        <OrphanageDetail>
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <ContainerImages>
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </ContainerImages>

          <OrphanageDetailContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.description}</p>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                main
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>orphanage.about</p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {orphanage.opening_hours}
              </Hour>

              <OpenOnWeekends openOnWeekends={orphanage.open_on_weekends}>
                <FiInfo size={32} />
                {orphanage.open_on_weekends ? 'Atendemos' : 'Não Atendemos'}
                <br />
                fim de semana
              </OpenOnWeekends>
            </OpenDetails>

            <ButtonContact>
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ButtonContact>
          </OrphanageDetailContent>
        </OrphanageDetail>
      </Main>
    </Container>
  );
};

export default Orphanage;
