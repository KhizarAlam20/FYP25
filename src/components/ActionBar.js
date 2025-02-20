import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Fav from '../../assets/svg/svgnew/Fav';

const ActionBar = ({ item, onOpenBottomSheet }) => {
  return (
    <View style={styles.actionBar}>
      <TouchableOpacity style={styles.actionButton} onPress={() => onOpenBottomSheet(item.restaurant)}>
        <Icon name="shopping-bag" size={24} color="white" />
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionCount}>Order!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Fav size={24} color="white" />
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionCount}>{item.stats.upvotes}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name="message-circle" size={24} color="white" />
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionCount}>{item.stats.reviews}</Text>
          <Text style={styles.actionLabel}>Reviews</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name="bookmark" size={24} color="white" />
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionCount}>{item.stats.saves}</Text>
          <Text style={styles.actionLabel}>Saves</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    position: 'absolute',
    right: 12,
    bottom: 60,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionTextContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  actionCount: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ActionBar;
