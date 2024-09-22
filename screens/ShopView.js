import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES, images, icons } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import {
  MaterialCommunityIcons,
  Octicons,
  Fontisto,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import { recentKeywords, products } from '../data/utils';
import { Modal } from 'react-native';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';

const ShopView = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderHeader = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.header1Icon}>
            <Image resizeMode="contain" source={icons.arrowLeft} style={styles.arrowLeftIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shop View</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={commonStyles.header1Icon}>
          <Image resizeMode="contain" source={icons.more} style={styles.moreIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderShopDetails = () => {
    const navigation = useNavigation();
    return (
      <View style={{ marginTop: 16 }}>
        <Image source={images.shop2} resizeMode="contain" style={styles.shopImage} />
        <Text style={styles.shopTitle}>Mercedes House</Text>
        <Text style={styles.shopDescription}>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a
          ante venenatis dapibus posuere velit aliquet.
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailsItem}>
            <Octicons name="star" size={24} color={COLORS.primary} />
            <Text style={styles.detailText}>4.7</Text>
          </View>
          <View style={styles.detailsItem}>
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.detailText}>Free</Text>
          </View>
          <View style={styles.detailsItem}>
            <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
            <Text style={styles.detailText}>2 days</Text>
          </View>
        </View>
        <View style={styles.keywordContainer}>
          <FlatList
            horizontal={true}
            data={recentKeywords}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CarByKeywords')}
                style={styles.keywordButton}
                key={index}
              >
                <Text style={styles.keywordText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  };

  const renderProductsByCategories = () => {
    const navigation = useNavigation();
    return (
      <View style={{ marginTop: 16 }}>
        <Text style={{ ...FONTS.body3, marginBottom: 12 }}>Mercedes (989) </Text>
        <View style={styles.productContainer}>
          {products.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail')}
              key={index}
              style={styles.productItem}
            >
              <Image source={item.image} resizeMode="contain" style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.shopName}>{item.shopName}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${item.price}</Text>
                <TouchableOpacity
                  onPress={() => console.log('Add to favourite')}
                  style={styles.addButton}
                >
                  <AntDesign name="plus" size={12} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderSearchModal = () => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [isStarSelected, setIsStarSelected] = useState(false);

    const handleOfferSelection = (offer) => {
      setSelectedOffer(offer);
    };

    const handlePriceSelection = (price) => {
      setSelectedPrice(price);
    };

    const handleTimeSelection = (time) => {
      setSelectedTime(time);
    };
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPressOut={() => setModalVisible(false)}
          activeOpacity={0.1}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: SIZES.height,
            width: SIZES.width,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                height: 'auto',
                width: SIZES.width * 0.9,
                borderRadius: 12,
                backgroundColor: COLORS.white,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <Text style={{ fontSize: 17, fontFamily: 'bold' }}>Filter your search</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={commonStyles.header3Icon}
                >
                  <Image
                    source={icons.close}
                    style={{
                      height: 24,
                      width: 24,
                      tintColor: COLORS.black,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>
                  OFFERS
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === 'Free Shipping' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleOfferSelection('Free Shipping')}
                  >
                    <Text style={[selectedOffer === 'Free Shipping' && styles.checkboxText]}>
                      Free Shipping
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === 'Pick Up' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleOfferSelection('Pick Up')}
                  >
                    <Text style={[selectedOffer === 'Pick Up' && styles.checkboxText]}>
                      Pick Up
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === 'Offer' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleOfferSelection('Offer')}
                  >
                    <Text style={[selectedOffer === 'Offer' && styles.checkboxText]}>Offer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === 'Oline payment available' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleOfferSelection('Oline payment available')}
                  >
                    <Text
                      style={[selectedOffer === 'Oline payment available' && styles.checkboxText]}
                    >
                      Oline payment available
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 2 }}>
                  DELIVER TIME
                </Text>

                <View style={{ flexDirection: 'row', marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === '1' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleTimeSelection('1')}
                  >
                    <Text style={[selectedTime === '1' && styles.checkboxText]}>1 days</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === '2' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleTimeSelection('2')}
                  >
                    <Text style={[selectedTime === '2' && styles.checkboxText]}>2 days</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === '3' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handleTimeSelection('3')}
                  >
                    <Text style={[selectedTime === '3' && styles.checkboxText]}>3 days</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>
                  PRICING
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === '$' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handlePriceSelection('$')}
                  >
                    <Text style={[selectedPrice === '$' && styles.checkboxText]}>$</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === '$$' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handlePriceSelection('$$')}
                  >
                    <Text style={[selectedPrice === '$$' && styles.checkboxText]}>$$</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === '$$$' && styles.selectedCheckbox,
                    ]}
                    onPress={() => handlePriceSelection('$$$')}
                  >
                    <Text style={[selectedPrice === '$$$' && styles.checkboxText]}>$$$</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>
                  RATING
                </Text>
                <View style={{ flexDirection: 'row', marginVertical: 13 }}>
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => setIsStarSelected(!isStarSelected)}
                  >
                    <Ionicons
                      name="md-star-sharp"
                      size={24}
                      color={isStarSelected ? COLORS.primary : COLORS.gray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => setIsStarSelected(!isStarSelected)}
                  >
                    <Ionicons
                      name="md-star-sharp"
                      size={24}
                      color={isStarSelected ? COLORS.primary : COLORS.gray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => setIsStarSelected(!isStarSelected)}
                  >
                    <Ionicons
                      name="md-star-sharp"
                      size={24}
                      color={isStarSelected ? COLORS.primary : COLORS.gray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => setIsStarSelected(!isStarSelected)}
                  >
                    <Ionicons
                      name="md-star-sharp"
                      size={24}
                      color={isStarSelected ? COLORS.primary : COLORS.gray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => setIsStarSelected(!isStarSelected)}
                  >
                    <Ionicons
                      name="md-star-sharp"
                      size={24}
                      color={isStarSelected ? COLORS.primary : COLORS.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Button
                title="FILTER"
                filled
                onPress={() => setModalVisible(false)}
                style={{
                  marginBottom: 12,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        {renderHeader()}
        <ScrollView>
          {renderShopDetails()}
          {renderProductsByCategories()}
        </ScrollView>
      </View>
      {renderSearchModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.gray6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  roundedCheckBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'regular',
  },
  starContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.secondaryGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeftIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 17,
    fontFamily: 'regular',
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  shopImage: {
    width: SIZES.width - 32,
    height: 150,
    borderRadius: 30,
  },
  shopTitle: {
    fontSize: 18,
    fontFamily: 'bold',
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  shopDescription: {
    fontSize: 13,
    fontFamily: 'regular',
    color: COLORS.gray5,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding3,
  },
  detailText: {
    marginLeft: 8,
  },
  keywordContainer: {
    marginVertical: 16,
  },
  keywordButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray6,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal: 8,
  },
  keywordText: {
    color: COLORS.tertiaryBlack,
    fontSize: 16,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SIZES.width - 32,
  },
  productItem: {
    flexDirection: 'column',
    paddingHorizontal: 2,
    paddingVertical: 4,
    height: 'auto',
    width: 160,
    borderWidth: 1,
    borderColor: COLORS.gray6,
    borderRadius: 15,
    marginRight: 'auto',
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 84,
    borderRadius: 15,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'bold',
    marginVertical: 4,
  },
  shopName: {
    fontSize: 13,
    fontFamily: 'regular',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 15,
    fontFamily: 'bold',
  },
  addButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});

export default ShopView;
