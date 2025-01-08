import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, icons } from '../constants';
// import { products } from '../data/utils';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';
import useProduct from '../hooks/useProduct';

const TopDeals = ({ navigation }) => {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);
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
          Productos
        </Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={icons.more} resizeMode="contain" style={styles.moreIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render Top Deals
   */

  const renderTopDeals = () => {
    return (
      <View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id + 'topDeals'}
          numColumns={2}
          renderItem={({ item, index }) => (
            <ProductCard
              key={index + 'subTopDeals'}
              name={item.name}
              type={item.categoryId.type}
              // rating={item.rating}
              price={item.categoryId.price}
              image={item.categoryId.image}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <CategoryList />
          {renderTopDeals()}
        </ScrollView>
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

export default TopDeals;
