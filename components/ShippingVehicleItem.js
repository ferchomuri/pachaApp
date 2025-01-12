import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const ShippingVehicleItem = ({ checked, onPress, title, subtitle, price, icon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rightContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={icon}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
            <View style={styles.leftContainer}>
                <View>
                    <Text style={styles.title}>${price}</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: 8 }} onPress={onPress}>
                    <View style={styles.checkContainer}>
                        {checked && <View style={styles.viewRounded} />}
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: .4,
        borderColor: COLORS.gray5,
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        height: 52,
        width: 52,
        backgroundColor: COLORS.primary,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 6
    },
    icon: {
        height: 24,
        width: 24,
        tintColor: COLORS.white
    },
    title: {
        fontSize: 12,
        fontFamily: "bold",
        color: COLORS.black
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray"
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    checkContainer: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    viewRounded: {
        height: 10,
        width: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 999
    }
})

export default ShippingVehicleItem