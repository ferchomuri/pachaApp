import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, icons, images } from '../constants'
import { Feather } from "@expo/vector-icons"
import Header from '../components/Header'

const ReviewSummary = ({ navigation }) => {

  /**
   * Render content
   */

  const renderContent = () => {
    return (
      <View>
        <View style={styles.orderContainer}>
          <Image
            source={images.car9}
            resizeMode='cover'
            style={styles.carImage}
          />
          <View style={{
            marginLeft: 12
          }}>
            <Text style={styles.carName}>BMW M5 Series</Text>
            <View style={{
              flexDirection: "row",
              marginVertical: 12
            }}>
              <View style={styles.carColor} />
              <Text style={styles.carColorName}>Silver</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.viewLeft}>Amount</Text>
            <Text style={styles.viewRight}>$170.000</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.viewLeft}>Shipping</Text>
            <Text style={styles.viewRight}>$300</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.viewLeft}>Tax</Text>
            <Text style={styles.viewRight}>$1000</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.viewLeft}>Total</Text>
            <Text style={styles.viewRight}>$171.000</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ShippingAddress")}
          style={styles.shippingAddressCard}>
          <View style={styles.shippingLeftContainer}>
            <View style={styles.gpsIconContainer}>
              <Image
                source={icons.gps}
                resizeMode='contain'
                style={styles.gpsIcon}
              />
            </View>
            <View style={{
              marginLeft: 12
            }}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressSubtitle}>61480 Sunbrook Park, PC 5679 </Text>
            </View>
          </View>
          <Feather name="edit-3" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.paymentCardContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Image
              source={images.paypal}
              resizeMode='contain'
              style={{
                height: 24,
                width: 24,
                marginRight: 12
              }}
            />
            <Text style={{
              fontFamily: "bold",
              fontSize: 14,
              color: COLORS.black
            }}>Paypal</Text>
          </View>
          <Text style={{
            fontFamily: "bold",
            fontSize: 14,
            color: COLORS.primary
          }}>Change</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Review Summary"/>
        <ScrollView>
          {renderContent()}
        </ScrollView>
        {/* Submit Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("EnterYourPIN")}
          style={styles.offerBtn}>
          <Text style={styles.offerBtnText}>Confirm Payment</Text>
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
  paymentCardContainer: {
    height: 64,
    width: "100%",
    borderWidth: .4,
    borderColor: COLORS.gray2,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: "space-between"
  },
  orderContainer: {
    height: 112,
    width: "100%",
    borderWidth: .4,
    borderColor: COLORS.gray2,
    borderRadius: 12,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8
  },
  carImage: {
    width: 112,
    height: 96,
    borderRadius: 16
  },
  carPrice: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: "bold"
  },
  carName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  carColor: {
    height: 20,
    width: 20,
    borderRadius: 26,
    backgroundColor: COLORS.secondaryGray,
    marginRight: 12
  },
  carColorName: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black
  },
  detailContainer: {
    width: "100%",
    borderWidth: .4,
    borderColor: COLORS.gray2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6
  },
  viewLeft: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black
  },
  viewRight: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black
  },
  shippingAddressCard: {
    height: 72,
    width: "100%",
    borderWidth: .4,
    borderColor: COLORS.gray2,
    borderRadius: 12,
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8
  },
  gpsIconContainer: {
    height: 52,
    width: 52,
    borderRadius: 32,
    backgroundColor: COLORS.gray6,
    alignItems: "center",
    justifyContent: "center"
  },
  shippingLeftContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    flexDirection: "row"
  },
  gpsIcon: {
    height: 42,
    width: 42,
    tintColor: COLORS.primary
  },
  addressTitle: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  addressSubtitle: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.black
  },
})
export default ReviewSummary