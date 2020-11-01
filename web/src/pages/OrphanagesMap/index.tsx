import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { Link } from 'react-router-dom';
import mapMarkerImg from '../../assets/map-marker.svg';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';

import {
  Container,
  Aside,
  Header,
  Footer,
  CreateOrphanage,
  PopupMarket,
} from './styles';

interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <Container>
      <Aside>
        <Header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita </p>
        </Header>

        <Footer>
          <strong>Balneário Camboriu</strong>
          <span>Santa Catarina</span>
        </Footer>
      </Aside>
      <Map
        center={[-27.0099472, -48.6288651]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <PopupMarket closeButton={false}>
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </PopupMarket>
          </Marker>
        ))}
      </Map>

      <CreateOrphanage to="/orphanages/create">
        <FiPlus size={32} color="#fff" />
      </CreateOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
