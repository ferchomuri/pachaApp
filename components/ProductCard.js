import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const ProductCard = ({ name, image, rating, type, price, onPress }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.likeContainer}>
        <Ionicons
          name={isFavourite ? 'heart-sharp' : 'heart-outline'}
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      <Image source={image} resizeMode="cover" style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star-half-o" size={20} color={COLORS.primary} />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 6,
            }}
          >
            <Text style={styles.rating}>{rating} | </Text>
            <View style={styles.typeContainer}>
              <Text style={styles.type}>{type}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: (SIZES.width - 32) / 2,
    marginBottom: 12,
  },
  image: {
    width: (SIZES.width - 32) / 2 - 2,
    height: (SIZES.width - 32) / 2 - 2,
    borderRadius: 22,
  },
  name: {
    fontSize: 16,
    fontFamily: 'bold',
    color: COLORS.primary,
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'regular',
  },
  typeContainer: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: COLORS.secondaryWhite,
  },
  type: {
    fontSize: 10,
    fontFamily: 'regular',
    color: COLORS.primary,
  },
  price: {
    fontFamily: 'bold',
    fontSize: 20,
    color: COLORS.primary,
    marginTop: 10,
  },
  likeContainer: {
    position: 'absolute',
    top: 12,
    zIndex: 999,
    right: 24,
  },
});
export default ProductCard;
