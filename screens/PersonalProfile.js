import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const PersonalProfile = () => {
    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={commonStyles.header1Icon}
                    >
                        <Image
                            resizeMode="contain"
                            source={icons.arrowLeft}
                            style={{
                                height: 24,
                                width: 24,
                                tintColor: COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 17,
                            fontFamily: 'regular',
                        }}
                    >
                        Perfil Personal
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            textTransform: 'uppercase',
                            color: COLORS.primary,
                            fontFamily: 'bold',
                        }}
                    >
                        Editar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderUserProfile = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 16,
                }}
            >
                <Image
                    source={images.avatar3}
                    resizeMode="contain"
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                    }}
                />
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ ...FONTS.h4 }}>John Bulla</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.gray5,
                            marginVertical: 6,
                        }}
                    >
                        I love Bugatti Chiron
                    </Text>
                </View>
            </View>
        )
    }

    const renderUserProfileInfo = () => {
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.subContainer}>
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="user"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.boldBody}>
                                    Nombre Completo
                                </Text>
                                <Text style={styles.textBody}>John Bulla</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subContainer}>
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={24}
                                    color="#413DFB"
                                />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.boldBody}>Email</Text>
                                <Text style={styles.textBody}>
                                    john@gmail.com
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subContainer}>
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="phone"
                                    size={24}
                                    color="#369BFF"
                                />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.boldBody}>
                                    Phone Number
                                </Text>
                                <Text style={styles.textBody}>408-278-248</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 16,
                }}
            >
                {renderHeader()}
                <ScrollView>
                    {renderUserProfile()}
                    {renderUserProfileInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray7,
        borderRadius: 16,
        width: SIZES.width - 32,
        paddingVertical: 8,
        marginBottom: 12,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.gray7,
        marginVertical: 8,
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    textBody: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#32343E',
    },
    iconRight: {
        height: 16,
        width: 16,
        marginRight: 8,
        tintColor: '#747783',
    },
    boldBody: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.black,
        textTransform: 'uppercase',
        marginVertical: 6,
    },
})

export default PersonalProfile
