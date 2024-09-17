import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
    StyleSheet,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS, icons } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { suggestedShops } from '../data/utils'
import { popularProducts } from '../data/utils'
import { recentKeywords } from '../data/utils'
import { ScrollView } from 'react-native-virtualized-view'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import Button from '../components/Button'

const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedStars, setSelectedStars] = useState(Array(5).fill(false))

    const handleStarPress = (index) => {
        const newSelectedStars = selectedStars.map((_, i) => i <= index)
        setSelectedStars(newSelectedStars)
    }

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    // render Search bar
    const renderSearchBar = () => {
        return (
            <View style={styles.searchBarContainer}>
                <View
                    style={{
                        marginHorizontal: SIZES.padding,
                    }}
                >
                    <Ionicons name="search" size={24} color={COLORS.gray4} />
                </View>
                <TextInput
                    placeholder="Buscar tomates, lechuga, etc"
                    onChangeText={handleSearch}
                    placeholderTextColor={COLORS.gray5}
                />
            </View>
        )
    }

    // Render most used keywords
    const renderKeywords = () => {
        const navigation = useNavigation()
        return (
            <View>
                <Text style={{ ...FONTS.body3, marginBottom: 6 }}>
                    Busquedas recientes
                </Text>
                <FlatList
                    horizontal={true}
                    data={recentKeywords}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CarByKeywords')}
                            style={{
                                height: 46,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: COLORS.gray6,
                                borderRadius: 30,
                                paddingHorizontal: 10,
                                marginHorizontal: 8,
                            }}
                            key={index}
                        >
                            <Text
                                style={{
                                    color: COLORS.tertiaryBlack,
                                    fontSize: 16,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    // Render Suggested Shops
    const renderSuggestedShops = () => {
        const navigation = useNavigation()
        return (
            <View style={{ marginVertical: 8 }}>
                <Text style={{ ...FONTS.body3, marginBottom: 6 }}>
                    Tiendas sugeridas
                </Text>
                {suggestedShops.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ShopView2')}
                        key={index}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 8,
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: 60,
                                height: 50,
                                borderRadius: 8,
                            }}
                        />
                        <View
                            style={{ flexDirection: 'column', marginLeft: 12 }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'regular',
                                    marginBottom: 4,
                                }}
                            >
                                {item.name}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Octicons
                                    name="star"
                                    size={24}
                                    color={COLORS.primary}
                                />
                                <Text style={{ marginLeft: 8 }}>
                                    {item.rating}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    // Render Popular Products
    const renderPopularProducts = () => {
        return (
            <View style={{ marginBottom: 80 }}>
                <Text style={{ ...FONTS.body3, marginBottom: 6 }}>
                    Productos populares
                </Text>
                <FlatList
                    horizontal={true}
                    data={popularProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flexDirection: 'column',
                                width: 154,
                                borderWidth: 1,
                                borderColor: COLORS.gray6,
                                paddingVertical: 12,
                                paddingHorizontal: 12,
                                borderRadius: 12,
                                marginRight: 12,
                            }}
                        >
                            <View
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={item.image}
                                    resizeMode="contain"
                                    style={{
                                        width: 122,
                                        height: 108,
                                        borderRadius: 15,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: 'bold',
                                    marginVertical: 4,
                                }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={{ fontSize: 13, fontFamily: 'regular' }}
                            >
                                ${item.price}
                            </Text>
                        </View>
                    )}
                />
            </View>
        )
    }

    // Render Search Modal box
    const renderSearchModal = () => {
        const [selectedOffer, setSelectedOffer] = useState(null)
        const [selectCondition, setselectCondition] = useState(null)
        const [selectedPrice, setSelectedPrice] = useState(null)
        const [isStarSelected, setIsStarSelected] = useState(false)

        const handleOfferSelection = (offer) => {
            setSelectedOffer(offer)
        }

        const handlePriceSelection = (price) => {
            setSelectedPrice(price)
        }

        const handleConditionSelection = (time) => {
            setselectCondition(time)
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
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
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
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
                                <Text
                                    style={{ fontSize: 17, fontFamily: 'bold' }}
                                >
                                    Filter your search
                                </Text>
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
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'regular',
                                        marginBottom: 10,
                                    }}
                                >
                                    OFFERS
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        marginVertical: 13,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectedOffer === 'Delivery' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleOfferSelection('Delivery')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedOffer === 'Delivery' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            Free Delivery
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectedOffer === 'Pick Up' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleOfferSelection('Pick Up')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedOffer === 'Pick Up' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            Pick Up
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectedOffer === 'Offer' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleOfferSelection('Offer')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedOffer === 'Offer' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            Offer
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectedOffer === 'No Fee' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleOfferSelection('No Fee')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedOffer === 'No Fee' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            No Fee
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectedOffer === 'Reward Points' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleOfferSelection(
                                                'Reward Points'
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedOffer ===
                                                    'Reward Points' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            Reward Points
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'regular',
                                        marginBottom: 2,
                                    }}
                                >
                                    CAR CONDITION
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: 13,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectCondition === 'All' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleConditionSelection('All')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectCondition === 'All' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            All
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectCondition === 'New' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleConditionSelection('New')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectCondition === 'New' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            New
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.checkboxContainer,
                                            selectCondition === 'Used' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handleConditionSelection('Used')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectCondition === 'Used' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            Used
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'regular',
                                        marginBottom: 10,
                                    }}
                                >
                                    PRICING
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: 13,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.roundedCheckBoxContainer,
                                            selectedPrice === '$' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handlePriceSelection('$')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedPrice === '$' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            $
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.roundedCheckBoxContainer,
                                            selectedPrice === '$$' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handlePriceSelection('$$')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedPrice === '$$' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            $$
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.roundedCheckBoxContainer,
                                            selectedPrice === '$$$' &&
                                                styles.selectedCheckbox,
                                        ]}
                                        onPress={() =>
                                            handlePriceSelection('$$$')
                                        }
                                    >
                                        <Text
                                            style={[
                                                selectedPrice === '$$$' &&
                                                    styles.checkboxText,
                                            ]}
                                        >
                                            $$$
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'regular',
                                        marginBottom: 10,
                                    }}
                                >
                                    RATING
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: 13,
                                    }}
                                >
                                    {selectedStars.map((isSelected, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.starContainer}
                                            onPress={() =>
                                                handleStarPress(index)
                                            }
                                        >
                                            <Ionicons
                                                name="star-sharp"
                                                size={24}
                                                color={
                                                    isSelected
                                                        ? COLORS.primary
                                                        : COLORS.gray
                                                }
                                            />
                                        </TouchableOpacity>
                                    ))}
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
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <StatusBar hidden={true} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.menuContainer}
                        >
                            <Image
                                source={icons.menu}
                                style={{
                                    height: 24,
                                    width: 24,
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'column',
                                marginLeft: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'regular',
                                }}
                            >
                                Buscar
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 99,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.tertiaryBlack,
                        }}
                    >
                        <View>
                            <View style={styles.shoppingBagContainer}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLORS.white,
                                    }}
                                >
                                    2
                                </Text>
                            </View>
                            <Feather
                                name="shopping-bag"
                                size={24}
                                color={COLORS.white}
                            />
                        </View>
                    </View>
                </View>
                {renderSearchBar()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderKeywords()}
                    {renderSuggestedShops()}
                    {renderPopularProducts()}
                </ScrollView>
            </View>
            {renderSearchModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        height: 45,
        width: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray6,
    },
    searchBarContainer: {
        width: SIZES.width - 32,
        height: 62,
        borderRadius: 10,
        backgroundColor: COLORS.tertiaryGray,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 16,
    },
    shoppingBagContainer: {
        position: 'absolute',
        top: -16,
        left: 12,
        backgroundColor: COLORS.primary,
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12.5,
        zIndex: 999,
    },
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
        borderColor: COLORS.gray6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
})

export default Search
