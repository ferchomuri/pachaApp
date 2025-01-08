import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import CategoryItem from '../components/CategoryItem';
import { ScrollView } from 'react-native-virtualized-view';
import useCategory from '../hooks/useCategory';

const Categories = ({ navigation }) => {
  const { categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  /**
   * Render header
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
          Categorias
        </Text>
        <TouchableOpacity style={styles.headerIcon}>
          {/* <Image source={icons.more} resizeMode="contain" style={styles.moreIcon} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render categories
   */

  const renderCategories = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((item, index) => (
          <CategoryItem
            key={index + 'allCategory'}
            name={item.name}
            image={item.image}
            id={item.id}
          />
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>{renderCategories()}</ScrollView>
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

export default Categories;
