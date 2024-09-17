import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { Feather, Ionicons } from '@expo/vector-icons'
import PromoCard from '../components/PromoCard'
import { ScrollView } from 'react-native-virtualized-view'

const Promotion = ({ navigation }) => {
    /**
     * @returns user header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerIcon}
                >
                    <Image
                        source={icons.arrowLeft}
                        resizeMode="contain"
                        style={styles.arrowLeft}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon}>
                    <Feather name="share" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>
        )
    }
    /**
     * Render Promo content
     */
    const renderPromoContent = () => {
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.subtitle, { marginRight: 8 }]}>
                        Limited time
                    </Text>
                    <Text style={styles.title}>Halloween</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { marginRight: 8 }]}>Sale</Text>
                    <Text style={styles.subtitle}>is coming back! </Text>
                </View>
                <View style={[styles.dateContainer]}>
                    <Ionicons
                        name="calendar"
                        size={14}
                        color={COLORS.primary}
                    />
                    <Text style={[styles.date]}>October 22, 2024</Text>
                </View>
                <View style={styles.promoCodeContainer}>
                    <View style={styles.priceTagContainer}>
                        <Image
                            source={icons.ticket}
                            resizeMode="contain"
                            style={styles.ticketIcon}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.code}>HLWN40</Text>
                        <Text style={styles.codeBody}>
                            Use this coupon to get 30% off on your transaction
                        </Text>
                    </View>
                </View>
                <View style={{ marginVertical: 16 }}>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip. Sed ut
                        perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam.
                    </Text>
                    <Text style={styles.description}>
                        {' '}
                        Eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit
                        aut fugit, sed quia consequuntur magni dolores
                    </Text>
                </View>
            </View>
        )
    }
    /***
     * Render actions button
     */
    const renderActionsButton = () => {
        return (
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity style={styles.actionsButton}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'bold',
                            color: COLORS.white,
                        }}
                    >
                        Explore more
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PromoCard
                        title="Trae tu carro"
                        subtitle="Deportivo"
                        image={images.promo4}
                        description="Ahorra el 30% en tu primera compra"
                        style={{
                            width: SIZES.width - 24,
                            height: 200,
                            marginVertical: 12,
                        }}
                    />
                    {renderPromoContent()}
                </ScrollView>
            </View>
            {renderActionsButton()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'bold',
        fontSize: 25,
        color: COLORS.primary,
    },
    subtitle: {
        fontFamily: 'regular',
        fontSize: 25,
        color: COLORS.primary,
    },
    dateContainer: {
        marginVertical: 8,
        flexDirection: 'row',
    },
    date: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.primary,
        marginLeft: 4,
    },
    promoCodeContainer: {
        height: 80,
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        borderRadius: 25,
        flexDirection: 'row',
    },
    priceTagContainer: {
        height: 48,
        width: 48,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginHorizontal: 12,
    },
    ticketIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.white,
    },
    code: {
        fontFamily: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        color: COLORS.primary,
    },
    codeBody: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    description: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    topButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.white,
        height: 72,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionsButton: {
        width: SIZES.width * 0.9,
        height: 54,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
})

export default Promotion
