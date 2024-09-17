import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { Entypo } from "@expo/vector-icons"

const ColorPicker = ({ onColorChange }) => {
  const colors = [ '#0076A3', "#8C7853" , '#ECF0F4',"#D63230", "#3D3D3D" ];
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color); // Notify parent component of color change
  };

  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorSwatch,
            { backgroundColor: color }
          ]}
          onPress={() => handleColorChange(color)}
        >
            {
                selectedColor === color ?  (
                    <Entypo name="check" size={24} color="black" />
                ) : null
            }
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 12
  },
  colorSwatch: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedColorSwatch: {
    borderColor: COLORS.gray,
    borderWidth: 4,
  },
});

export default ColorPicker;