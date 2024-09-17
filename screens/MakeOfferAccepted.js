import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, illustrations } from '../constants'
import Header from '../components/Header'

const MakeOfferAccepted = ({ navigation }) => {
   
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Make an offer"/>
                <ScrollView>
                    <Image
                        source={illustrations.offerAccepted}
                        resizeMode='contain'
                        style={styles.offerProcessed}
                    />
                    <Text style={styles.offerSubtitle}>Congrats! Your offer has been accepted</Text>
                    <Text style={styles.offerText}>Your offer has been accpeted by the seller for $170000</Text>
                </ScrollView>
                {/* Submit Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Checkout")}
                    style={styles.offerBtn}>
                    <Text style={styles.offerBtnText}>Proceed to Checkout</Text>
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
        alignItems: "center"
    },
    headerIcon: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        backgroundColor: COLORS.gray
    },
    arrowLeft: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    moreIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
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

export default MakeOfferAccepted