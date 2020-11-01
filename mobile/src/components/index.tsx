import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Container, HeaderText } from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC = ({ title, showCancel = true }: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBackToHomePage = useCallback(() => {
    navigation.navigate('OrphanageMap');
  }, [navigation]);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b5d6" />
      </BorderlessButton>

      <HeaderText>{title}</HeaderText>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
