import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

const PromoCard = ({ title, subtitle, description, image, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.container, ...style }}>
      <Image source={image} resizeMode="cover" style={styles.image} />
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="arrow-right-alt" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 270,
    borderRadius: 25,
    marginRight: 16,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    zIndex: -999,
  },
  title: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: 'bold',
  },
  description: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.white,
  },
  bodyContainer: {
    marginLeft: 22,
    position: 'absolute',
    top: 22,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    backgroundColor: COLORS.primary,
    height: 56,
    width: 96,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PromoCard;
