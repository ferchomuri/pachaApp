import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons, SIZES, COLORS, FONTS } from '../constants'
import { orderList } from '../data/utils'
import { TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import VerticalStepper from '../components/VerticalStepper'
import { StatusBar } from 'expo-status-bar'

const TrackingOrderV2 = ({ navigation }) => {
    const bottomSheetRef = useRef(null)

    // Open the bottom sheet on component mount
    useEffect(() => {
        bottomSheetRef.current.open()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <View
                style={{
                    position: 'absolute',
                    marginHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    top: 22,
                    zIndex: 999,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        height: 45,
                        width: 45,
                        borderRadius: 22.5,
                        backgroundColor: COLORS.black,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                        zIndex: 9999,
                    }}
                >
                    <Image
                        source={icons.arrowLeft}
                        resizeMode="contain"
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body3 }}>Estado del Pedido</Text>
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {orderList.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        image={icons.mapMarkerIcon}
                        title={item.name}
                        description={item.description}
                        onPress={() => console.log('Move to another screen')}
                    >
                        <Callout tooltip>
                            <View>
                                <View style={styles.bubble}>
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <RBSheet
                ref={bottomSheetRef}
                height={550}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: COLORS.gray6,
                        width: 100,
                    },
                }}
            >
                <View
                    style={{
                        width: SIZES.width - 32,
                        marginHorizontal: 16,
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                marginRight: 12,
                            }}
                        >
                            <Image
                                source={images.car3}
                                resizeMode="contain"
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 12,
                                    borderColor: COLORS.gray,
                                    borderWidth: 1,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                            }}
                        >
                            <Text style={{ ...FONTS.h4 }}>Super Car House</Text>
                            <Text style={styles.body3}>
                                Orderd at 12 Jan, 10:00pm
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.h3}>2x</Text>
                                <Text style={styles.body3}>BMW Serie 8</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.h3}>4x</Text>
                                <Text style={styles.body3}>Honda F-18</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 22,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>2 days</Text>
                        <Text
                            style={{
                                fontFamily: 'regular',
                                fontSize: 14,
                                color: COLORS.gray5,
                                textTransform: 'uppercase',
                                marginTop: 8,
                            }}
                        >
                            Estimated delivery time
                        </Text>
                    </View>

                    <VerticalStepper />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={images.avatar2}
                                style={{
                                    height: 54,
                                    width: 54,
                                    borderRadius: 27,
                                }}
                            />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={{ ...FONTS.h4 }}>
                                    Liliana B30.
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: COLORS.gray5,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    Courier
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Call')}
                                style={styles.btn1}
                            >
                                <Feather
                                    name="phone"
                                    size={24}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Message')}
                                style={[styles.btn2, { marginLeft: 12 }]}
                            >
                                <FontAwesome5
                                    name="facebook-messenger"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        zIndex: 1,
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    body3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
    },
    h3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
        fontFamily: 'bold',
        marginRight: 6,
    },
    btn1: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn2: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default TrackingOrderV2
