import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ColorPicker from '../components/ColorPicker';
import SellerCard from '../components/SellerCard';

const Detail = ({ navigation }) => {
  /**
   * Render heder
   */
  const renderHeader = () => {
    const [isSaved, setIsSaved] = useState(false);
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Image source={icons.arrowLeft} resizeMode="contain" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)} style={styles.headerIcon}>
          <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render content
   */

  const renderContent = () => {
    const [selectedColor, setSelectedColor] = useState('#FF0000'); // Default color
    const [showFullDescription, setShowFullDescription] = useState(false);
    const description =
      'The BMW M5 Series is the epitome of precision engineering and high-performance luxury. This extraordinary vehicle seamlessly combines cutting-edge technology with a powerful heart, boasting a roaring engine that delivers an exhilarating driving experience. With its sleek, aerodynamic design and impeccable craftsmanship, the M5 Series is a symbol of automotive excellence.';
    const gallerImage = [
      { id: '1', image: images.car1 },
      { id: '2', image: images.car2 },
      { id: '3', image: images.car3 },
      { id: '4', image: images.car4 },
      { id: '5', image: images.car5 },
      { id: '6', image: images.car6 },
      { id: '7', image: images.car7 },
    ];

    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };

    const handleColorChange = (color) => {
      setSelectedColor(color);
    };
    return (
      <View>
        <Image source={images.car4} resizeMode="cover" style={styles.carImage} />
        <View style={styles.colorPickerContainer}>
          <ColorPicker onColorChange={handleColorChange} />
        </View>
        <View>
          <Text style={styles.carName}>BMW M5 Series</Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
            }}
          >
            <View style={styles.carTypeContainer}>
              <Text style={styles.carType}>New</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
              }}
            >
              <FontAwesome name="star-half-empty" size={16} color="black" />
              <Text style={styles.star}>4.8</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CarReviews')}>
              <Text style={styles.reviewName}>(86 reviews)</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.description}>
            {showFullDescription ? description : `${description.slice(0, 100)}...`}
          </Text>
          {description.length > 100 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.descriptionButton}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.subtitle}>Gallery Photos</Text>
          <FlatList
            data={gallerImage}
            resizeMode="contain"
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item, index }) => (
              <Image source={item.image} resizeMode="cover" style={styles.galleryImage} />
            )}
          />
          <SellerCard />
        </View>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceTitle}>Price</Text>
            <Text style={styles.price}>$175,000</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MakeOffer')}
            style={styles.offerBtnContainer}
          >
            <Text style={styles.offerBtnText}>Make an Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>{renderContent()}</ScrollView>
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
  headerTitle: {
    fontSize: 16,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  carImage: {
    height: 222,
    width: '100%',
    borderRadius: 22,
  },
  colorPickerContainer: {
    alignItems: 'center',
  },
  carName: {
    fontSize: 24,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  carTypeContainer: {
    height: 24,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray6,
    borderRadius: 4,
  },
  carType: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.black,
  },
  star: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.black,
    marginHorizontal: 4,
  },
  reviewName: {
    fontFamily: 'regular',
    color: COLORS.black,
    fontSize: 12,
  },
  subtitle: {
    fontFamily: 'bold',
    fontSize: 18,
    color: COLORS.black,
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    color: COLORS.secondary,
    fontFamily: 'regular',
  },
  descriptionButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'bold',
  },
  price: {
    fontSize: 22,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  offerBtnContainer: {
    height: 48,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerBtnText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'regular',
  },
  priceTitle: {
    fontSize: 12,
    fontFamily: 'regular',
    color: 'gray',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  galleryImage: {
    height: 84,
    width: 84,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
export default Detail;
