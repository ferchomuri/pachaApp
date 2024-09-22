import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { promoData } from '../data/promoData';
import PromoCard from '../components/PromoCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';

const SpecialOffers = ({ navigation }) => {
  /**
   * Render heder
   */

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Image source={icons.arrowLeft} resizeMode="contain" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'bold',
            color: COLORS.black,
          }}
        >
          Special Offers
        </Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={icons.more} resizeMode="contain" style={styles.moreIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render special offers
   */

  const renderSpecialOffers = () => {
    return (
      <View>
        <FlatList
          data={promoData}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PromoCard
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              description={item.description}
              onPress={() => navigation.navigate('Promotion')}
              style={{
                width: '100%',
                marginBottom: 12,
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>{renderSpecialOffers()}</ScrollView>
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
});

export default SpecialOffers;
