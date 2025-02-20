import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Content = ({ item }) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.userContainer}>
        <Image source={item.user.picture} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <TouchableOpacity style={styles.followerBadge}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={12} color="white" />
            <Text style={styles.locationText}>{item.restaurant.location}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{item.content.description}</Text>

      {item.content.specialOffer && (
        <TouchableOpacity style={styles.offerBadge}>
          <Icon name="gift" size={14} color="white" />
          <Text style={styles.offerText}>{item.content.specialOffer}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.tagContainer}>
        {item.content.tags.map((tag, index) => (
          <View key={index} style={styles.tagPill}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 60,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FF3D44',
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: 'white',
    lineHeight: 18,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  offerBadge: {
    backgroundColor: '#FF3D44',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  offerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Content;
