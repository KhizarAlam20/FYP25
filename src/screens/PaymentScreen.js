import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
  primary: '#FFD700', // Gold
  background: '#000000', // Black
  card: '#1A1A1A', // Slightly lighter black
  text: '#FFFFFF', // White
  subtext: '#BBBBBB', // Light gray
  success: '#4CAF50', // Green
  error: '#FF5252', // Red
  divider: '#333333', // Dark gray
};

const PaymentScreen = ({ route, navigation }) => {
  // Course details would come from route.params in real app
  const courseDetails = {
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    originalPrice: 99.99,
    discountedPrice: 89.99,
    discount: 10,
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const matches = cleaned.match(/(\d{4})/g);
    const formatted = matches ? matches.join(' ') : cleaned;
    return formatted.substr(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substr(0, 2)}/${cleaned.substr(2, 2)}`;
    }
    return cleaned;
  };

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !name) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Success',
        'Payment processed successfully! You now have access to the course.',
        [
          {
            text: 'Start Learning',
            onPress: () => navigation.navigate('CourseScreen', { courseId: 1 }),
          },
        ]
      );
    }, 2000);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Checkout</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderCourseDetails = () => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{courseDetails.title}</Text>
      <Text style={styles.instructorName}>by {courseDetails.instructor}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.discountedPrice}>
          ${courseDetails.discountedPrice}
        </Text>
        <Text style={styles.originalPrice}>
          ${courseDetails.originalPrice}
        </Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{courseDetails.discount}% OFF</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentMethods}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.methodsContainer}>
        <TouchableOpacity
          style={[
            styles.methodCard,
            paymentMethod === 'card' && styles.selectedMethod,
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <Icon name="credit-card" size={24} color={COLORS.primary} />
          <Text style={styles.methodText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodCard,
            paymentMethod === 'paypal' && styles.selectedMethod,
          ]}
          onPress={() => setPaymentMethod('paypal')}
        >
          <Icon name="account-balance-wallet" size={24} color={COLORS.primary} />
          <Text style={styles.methodText}>PayPal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.cardForm}>
      <Text style={styles.sectionTitle}>Card Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="4242 4242 4242 4242"
          placeholderTextColor={COLORS.subtext}
          value={cardNumber}
          onChangeText={(text) => setCardNumber(formatCardNumber(text))}
          keyboardType="numeric"
          maxLength={19}
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            placeholderTextColor={COLORS.subtext}
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            placeholderTextColor={COLORS.subtext}
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor={COLORS.subtext}
          value={name}
          onChangeText={setName}
        />
      </View>
    </View>
  );

  const renderCouponSection = () => (
    <View style={styles.couponSection}>
      <Text style={styles.sectionTitle}>Have a Coupon?</Text>
      <View style={styles.couponContainer}>
        <TextInput
          style={[styles.input, styles.couponInput]}
          placeholder="Enter coupon code"
          placeholderTextColor={COLORS.subtext}
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summary}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Original Price</Text>
        <Text style={styles.summaryText}>${courseDetails.originalPrice}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Discount</Text>
        <Text style={styles.summaryText}>-${(courseDetails.originalPrice - courseDetails.discountedPrice).toFixed(2)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>${courseDetails.discountedPrice}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView}>
        {renderCourseDetails()}
        {renderPaymentMethods()}
        {paymentMethod === 'card' && renderCardForm()}
        {renderCouponSection()}
        {renderSummary()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            <Text style={styles.payButtonText}>
              {isProcessing ? 'Processing...' : `Pay $${courseDetails.discountedPrice}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  courseCard: {
    backgroundColor: COLORS.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  courseTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructorName: {
    color: COLORS.subtext,
    fontSize: 14,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    color: COLORS.subtext,
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentMethods: {
    padding: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  methodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  selectedMethod: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  methodText: {
    color: COLORS.text,
    marginTop: 8,
  },
  cardForm: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  couponSection: {
    padding: 16,
  },
  couponContainer: {
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  summary: {
    padding: 16,
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryText: {
    color: COLORS.subtext,
    fontSize: 14,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 12,
    marginTop: 4,
  },
  totalText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;