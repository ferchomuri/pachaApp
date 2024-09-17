import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, illustrations } from '../constants'
import Header from '../components/Header'

const MakeOfferProcessed = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Make an offer"/>
                <ScrollView>
                    <Image
                        source={illustrations.offerProcessed}
                        resizeMode='contain'
                        style={styles.offerProcessed}
                    />
                    <Text style={styles.offerSubtitle}>Your offer is being proccessed</Text>
                    <Text style={styles.offerText}>Please check notifications periodically to see if
                        your offer was accepted or rejected by the seller.</Text>
                </ScrollView>
                {/* Submit Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("MakeOfferRejected")}
                    style={styles.offerBtn}>
                    <Text style={styles.offerBtnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
    offerBtn: {
        width: SIZES.width - 32,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        position: "absolute",
        bottom: 0,
        right: 16,
        left: 16,
        marginVertical: 16
    },
    offerBtnText: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.white
    },
    offerTitle: {
        fontFamily: "regular",
        fontSize: 12,
        color: COLORS.black
    },
    offerProcessed: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8
    },
    offerSubtitle: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black,
        textAlign: "center",
    },
    offerText: {
        fontSize: 16,
        fontFamily: "regular",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 22
    }
})

export default MakeOfferProcessed