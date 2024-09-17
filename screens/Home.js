import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { Ionicons } from '@expo/vector-icons'
import KeywordList from '../components/KeywordList'
import PromoCard from '../components/PromoCard'
import { promoData } from '../data/promoData'
import { categories, products } from '../data/utils'
import CategoryItem from '../components/CategoryItem'
import ProductCard from '../components/ProductCard'

const Home = ({ navigation }) => {
    /**
     *
     * @returns Render header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerTopContainer}>
                <TouchableOpacity style={styles.locationContainer}>
                    <Image
                        source={icons.maps}
                        resizeMode="contain"
                        style={styles.mapIcon}
                    />
                    <Text style={styles.location}>Paris, France</Text>
                    <Image
                        source={icons.arrowDown}
                        resizeMode="contain"
                        style={styles.arrowDownIcon}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={styles.notiIcon}
                    >
                        <View style={styles.notiMarker} />
                        <Image
                            source={icons.bellOutline}
                            resizeMode="contain"
                            style={styles.bellOutline}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PersonalProfile')}
                        style={styles.avatarContainer}
                    >
                        <Image
                            source={images.avatar}
                            resizeMode="contain"
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * Render search bar
     */

    const renderSearhBar = () => {
        const [search, setSearch] = useState('')

        return (
            <React.Fragment>
                <View style={styles.headerTitleContainer}>
                    <View style={styles.headerContainer}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            Hola,
                        </Text>
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: 'bold',
                                color: COLORS.black,
                            }}
                        >
                            Jonathan!
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 25,
                            fontFamily: 'regular',
                            color: COLORS.black,
                        }}
                    >
                        ¿Qué deseas hoy?
                    </Text>
                </View>
                <View style={styles.searchHeader}>
                    <TouchableOpacity>
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Buscar tomates, lechugas, etc"
                        placeholderTextColor={COLORS.secondaryGray}
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        style={styles.input}
                    />
                    <Ionicons name="mic-outline" size={24} color="black" />
                </View>
            </React.Fragment>
        )
    }

    /**
     * Render Proma card
     */

    const renderPromoCard = () => {
        return (
            <View>
                <View style={styles.spaceBetween}>
                    <Text style={styles.spaceLeft}>Oferas Especiales</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SpecialOffers')}
                    >
                        <Text style={styles.spaceRight}> Ver todo</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={promoData}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <PromoCard
                            title={item.title}
                            subtitle={item.subtitle}
                            image={item.image}
                            description={item.description}
                            onPress={() => navigation.navigate('Promotion')}
                        />
                    )}
                />
            </View>
        )
    }

    /**
     * Render all categories
     */

    const renderCategories = () => {
        return (
            <View>
                <View style={styles.spaceBetween}>
                    <Text style={styles.spaceLeft}>Categorias Populares</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Categories')}
                    >
                        <Text style={styles.spaceRight}>Ver todo</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {categories.slice(0, 12).map((item, index) => (
                        <CategoryItem
                            name={item.name}
                            image={item.image}
                            id={item.id}
                            key={index}
                        />
                    ))}
                </View>
            </View>
        )
    }

    /**
     * Render top products
     */

    const renderTopProducts = () => {
        return (
            <View>
                <View style={styles.spaceBetween}>
                    <Text style={styles.spaceLeft}>Productos Populares</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TopDeals')}
                    >
                        <Text style={styles.spaceRight}>Ver todo</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <ProductCard
                            name={item.name}
                            type={item.type}
                            rating={item.rating}
                            price={item.price}
                            image={item.image}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    )}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderSearhBar()}
                    <KeywordList />
                    {renderPromoCard()}
                    {renderCategories()}
                    {renderTopProducts()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 2,
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        paddingVertical: 16,
    },
    headerTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    locationContainer: {
        flexDirection: 'row',
        height: 50,
        width: 164,
        borderRadius: 24,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: COLORS.secondaryGray,
    },
    location: {
        fontSize: 12,
        color: COLORS.primary,
        fontFamily: 'bold',
        marginHorizontal: 6,
    },
    mapIcon: {
        height: 18,
        width: 18,
        tintColor: COLORS.primary,
    },
    arrowDownIcon: {
        width: 10,
        height: 10,
        tintColor: COLORS.primary,
    },
    notiIcon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryWhite,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 9999,
    },
    bellOutline: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
    },
    notiMarker: {
        height: 6,
        width: 6,
        borderRadius: 999,
        backgroundColor: 'red',
        position: 'absolute',
        top: 12,
        right: 17,
        zIndex: 999,
    },
    avatarContainer: {
        height: 50,
        width: 50,
        borderRadius: 999,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    avatar: {
        height: 49,
        width: 49,
        borderRadius: 999,
    },
    headerTitleContainer: {
        marginVertical: 16,
    },
    headerContainer: {
        flexDirection: 'row',
    },
    searchHeader: {
        height: 70,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#F5F4F8',
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 12,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    headingTitle: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    headingSubtitle: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.primary,
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    spaceLeft: {
        fontSize: 22,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    spaceRight: {
        ...FONTS.body4,
    },
})
export default Home
