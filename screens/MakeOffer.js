import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const MakeOffer = ({ navigation }) => {
  const [customAmount, setCustomAmount] = useState('');
  const suggestedAmounts = [174900, 172000, 120300, 144000, 125000, 146000, 122700, 190800, 190900];
  const navigate = useNavigation();

  const handleCustomAmountChange = (amount) => {
    setCustomAmount(amount);
  };

  const handleOfferSubmit = () => {
    // This could involve an API call or other actions.
    console.log(`Offer submitted: ${customAmount}`);
    navigate.navigate('MakeOfferProcessed');
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Make an Offer" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.offerTitle}>Enter your offer amount</Text>

            {/* Custom Amount Input */}
            <TextInput
              placeholder="120000"
              placeholderTextColor={COLORS.primary}
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              keyboardType="numeric"
              style={styles.amountInput}
            />

            {/* Suggested Amounts */}
            <View style={styles.amountContainer}>
              {suggestedAmounts.map((amount, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCustomAmountChange(amount.toString())}
                  style={{
                    borderWidth: 1,
                    width: 92,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 22,
                    marginHorizontal: 8,
                    borderColor:
                      customAmount === amount.toString() ? COLORS.primary : COLORS.primary,
                    marginVertical: 8,
                    backgroundColor: customAmount === amount.toString() ? COLORS.primary : 'white',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'bold',
                      color: customAmount === amount.toString() ? COLORS.white : COLORS.primary,
                    }}
                  >
                    ${amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        {/* Submit Button */}
        <TouchableOpacity onPress={handleOfferSubmit} style={styles.offerBtn}>
          <Text style={styles.offerBtnText}>Send Offer</Text>
        </TouchableOpacity>
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
    position: 'absolute',
    bottom: 0,
    right: 16,
    left: 16,
    marginVertical: 16,
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
  amountInput: {
    borderWidth: 1,
    width: SIZES.width - 32,
    height: 112,
    borderRadius: 22,
    borderColor: COLORS.tertiaryBlack,
    marginVertical: 22,
    fontSize: 30,
    fontFamily: 'bold',
    paddingHorizontal: 22,
    borderColor: COLORS.primary,
    color: COLORS.primary,
  },
  amountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
  },
});
export default MakeOffer;
