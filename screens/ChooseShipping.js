import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons } from '../constants';
import ShippingVehicleItem from '../components/ShippingVehicleItem';
import Header from '../components/Header';

const ChooseShipping = ({ navigation }) => {
  /**
   * Render content
   */

  const renderContent = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCheckboxPress = (itemTitle) => {
      if (selectedItem === itemTitle) {
        // If the clicked item is already selected, deselect it
        setSelectedItem(null);
      } else {
        // Otherwise, select the clicked item
        setSelectedItem(itemTitle);
      }
    };
    return (
      <View>
        <ShippingVehicleItem
          checked={selectedItem === 'Truck'} // Check if it's the selected item
          onPress={() => handleCheckboxPress('Truck')} // Pass the item title
          title="Truck"
          subtitle="Est Arrival, Dec 20-23"
          price="200"
          icon={icons.truck}
        />
        <ShippingVehicleItem
          checked={selectedItem === 'Train'}
          onPress={() => handleCheckboxPress('Train')}
          title="Train"
          subtitle="Est Arrival, Dec 19-20"
          price="250"
          icon={icons.train}
        />
        <ShippingVehicleItem
          checked={selectedItem === 'Container Ship'}
          onPress={() => handleCheckboxPress('Container Ship')}
          title="Container Ship"
          subtitle="Est Arrival, Dec 20-22"
          price="300"
          icon={icons.ship}
        />
        <ShippingVehicleItem
          checked={selectedItem === 'Plane'}
          onPress={() => handleCheckboxPress('Plane')}
          title="Plane"
          subtitle="Est Arrival, Dec 19-20"
          price="400"
          icon={icons.plane}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Choose Shipping" />
        {renderContent()}
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={[
            styles.offerBtn,
            {
              position: 'absolute',
              bottom: 0,
              right: 16,
              left: 16,
            },
          ]}
        >
          <Text style={styles.offerBtnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  headerIcon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: COLORS.gray,
  },
  arrowLeft: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  offerBtn: {
    width: SIZES.width - 32,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginVertical: 16,
  },
  offerBtnText: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.white,
  },
});
export default ChooseShipping;
