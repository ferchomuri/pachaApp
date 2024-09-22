import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, SIZES, illustrations } from '../constants';
import Header from '../components/Header';

const MakeOfferRejected = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Make an offer" />
        <ScrollView>
          <Image
            source={illustrations.offerDenied}
            resizeMode="contain"
            style={styles.offerProcessed}
          />
          <Text style={styles.offerSubtitle}>{`We're sorry, your offer has been rejected`}</Text>
          <Text style={styles.offerText}>
            {`Don't worry, you will always be able to make another offer that is more suitable, so that your offer is accepted.`}
          </Text>
        </ScrollView>
        {/* Submit Button */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 16,
            left: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('MakeOffer')}
            style={styles.offerBtn}
          >
            <Text style={styles.offerBtnText}>Make an Offer Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MakeOfferAccepted')}
            style={[
              styles.offerBtn,
              {
                backgroundColor: COLORS.gray6,
              },
            ]}
          >
            <Text
              style={[
                styles.offerBtnText,
                {
                  color: COLORS.black,
                },
              ]}
            >
              Back To Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  offerBtn: {
    width: SIZES.width - 32,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginBottom: 6,
  },
  offerBtnText: {
    fontSize: 12,
    fontFamily: 'regular',
    color: COLORS.white,
  },
  offerTitle: {
    fontFamily: 'regular',
    fontSize: 12,
    color: COLORS.black,
  },
  offerProcessed: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
  },
  offerSubtitle: {
    fontSize: 24,
    fontFamily: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  offerText: {
    fontSize: 16,
    fontFamily: 'regular',
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 22,
  },
});

export default MakeOfferRejected;
