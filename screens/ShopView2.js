import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { MaterialCommunityIcons, Octicons, Fontisto, AntDesign } from '@expo/vector-icons';
import { recentKeywords, products } from '../data/utils';
import ImageSlider from '../components/ImageSlider';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { commonStyles } from '../styles/CommonStyles';

const ShopView2 = () => {
  const navigation = useNavigation();

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.header3Icon}>
          <Image resizeMode='contain' source={icons.arrowLeft} style={styles.arrowLeftIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Move to another screen')} style={commonStyles.header3Icon}>
          <Image resizeMode='contain' source={icons.more} style={styles.moreIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderShopDetails = () => {
    return (
      <View>
        <ImageSlider />

        <View style={styles.shopDetailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.ratingContainer}>
              <Octicons name="star" size={24} color={COLORS.primary} />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
            <View style={styles.deliveryContainer}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
              <Text style={styles.deliveryText}>Free</Text>
            </View>
            <View style={styles.timeContainer}>
              <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
              <Text style={styles.timeText}>2 days</Text>
            </View>
          </View>
          <Text style={styles.shopName}>Ferari House Shop</Text>
          <Text style={styles.shopDescription}>
            Feraria sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis
            dapibus posuere velit aliquet.
          </Text>

          {/* Render Keyword related to shops */}
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
      </View>
    );
  };

  const renderProductsByCategories = () => {
    return (
      <View style={styles.productsContainer}>
        <Text style={FONTS.body3}>Ferari (90)</Text>
        <View style={styles.productsList}>
          {products.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail')}
              key={index}
              style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.shopName}>{item.shopName}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${item.price}</Text>
                <TouchableOpacity onPress={() => console.log('Add to favourite')} style={styles.addToFavouriteButton}>
                  <AntDesign name="plus" size={12} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ScrollView>
          {renderHeader()}
          {renderShopDetails()}
          {renderProductsByCategories()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    width: SIZES.width - 32,
    zIndex: 999,
  },
  arrowLeftIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  shopDetailsContainer: {
    marginHorizontal: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding3,
  },
  deliveryText: {
    marginLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 8,
  },
  shopName: {
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
  productsContainer: {
    marginHorizontal: 16,
  },
  productsList: {
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
  addToFavouriteButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
};

export default ShopView2;
