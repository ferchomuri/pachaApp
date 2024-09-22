import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants';

const CategoryItem = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        marginRight: 18,
      }}
    >
      <View
        style={{
          height: 64,
          width: 64,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.secondaryWhite,
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{
            height: 36,
            width: 36,
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 14,
          fontFamily: 'bold',
          marginVertical: 12,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
