import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, icons, images } from '../constants'
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

const SellerCard = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}>
            <Image
              source={images.avatar2}
              resizeMode="contain"
              style={styles.sellerLogo}
            />
            <View style={{
                marginLeft: 12
            }}>
               <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6
               }}>
                 <Text style={styles.sellerName}>BMW Store</Text>
                 <Image
                   source={icons.quality}
                   resizeMode='contain'
                   style={{
                     height: 16,
                     width: 16,
                     tintColor: "#4895EF",
                     marginLeft: 8
                   }}
                 />
               </View>
               <Text style={styles.description}>Official Account of BMW</Text>
            </View>
        </View>
        <View style={{
            flexDirection: "row"
        }}>
             <TouchableOpacity
              onPress={()=>navigation.navigate("Chat")}
             >
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
             </TouchableOpacity>
             <TouchableOpacity
               style={{
                marginLeft: 12
               }}
               onPress={()=>navigation.navigate("Call")}
             >
             <SimpleLineIcons name="phone" size={24} color="black" />
             </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: 16
    },
    sellerLogo: {
        height: 58,
        width: 58,
        borderRadius: 999
    },
    sellerName: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black
    },
    description: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.black
    }
})
export default SellerCard