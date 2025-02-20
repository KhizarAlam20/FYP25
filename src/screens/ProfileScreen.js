import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('grid');
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setIsLoading] = useState(true);

  // Sample food images from Pexels (these URLs are reliable and free to use)
  const pexelsImages = [
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg',
    'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg',
    'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg',
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    'https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg',
  ];

  const profileData = {
    username: "ChefJohn",
    description: "🍕 Italian Cuisine Specialist\n📍 New York\n🌟 Featured on Food Network",
    followers: "12.5K",
    following: "845",
    upvotes: "45.2K",
    rating: 4.8,
    reviews: "1.2K",
    hours: "9:00 AM - 10:00 PM",
    location: "Manhattan, NY",
    posts: pexelsImages.map(url => ({ imageUrl: url }))
  };

  useEffect(() => {
    // Simulate loading images
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProfessionalDashBoardScreen=()=>{
    navigation.navigate('ProfessionalDashboardScreen');
  }

  const renderHeader = () => (
    <View style={s`flex-row justify-between items-center px-4 py-2 border-b border-gray-100`}>
      <Text style={[s`text-xl text-gray-800`, { fontFamily: 'Outfit-Bold' }]}>
        {profileData.username}
      </Text>
      <TouchableOpacity>
        <Icon name="setting" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderProfile = () => (
    <View style={s`px-4 pt-3`}>
      {/* Profile Header */}
      <View style={s`flex-row items-center`}>
        {/* Profile Image */}
        <View style={s`mr-6`}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg' }}
            style={s`w-20 h-20 rounded-full border-2 border-gray-100`}
          />
        </View>

        {/* Stats */}
        <View style={s`flex-row flex-1 justify-around`}>
          <View style={s`items-center`}>
            <Text style={[s`text-base font-bold`, { fontFamily: 'Outfit-Bold' }]}>
              {profileData.posts.length}
            </Text>
            <Text style={s`text-gray-600`}>Posts</Text>
          </View>
          <View style={s`items-center`}>
            <Text style={[s`text-base font-bold`, { fontFamily: 'Outfit-Bold' }]}>
              {profileData.followers}
            </Text>
            <Text style={s`text-gray-600`}>Followers</Text>
          </View>
          <View style={s`items-center`}>
            <Text style={[s`text-base font-bold`, { fontFamily: 'Outfit-Bold' }]}>
              {profileData.upvotes}
            </Text>
            <Text style={s`text-gray-600`}>Upvotes</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={s`mt-3`}>
        <Text style={[s`text-sm text-gray-800`, { fontFamily: 'Outfit-Medium' }]}>
          {profileData.description}
        </Text>
      </View>

      {/* Rating and Hours */}
      <View style={s`flex-row items-center mt-2`}>
        <View style={s`flex-row items-center`}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={s`ml-1 text-gray-800`}>{profileData.rating}</Text>
          <Text style={s`ml-1 text-gray-600`}>({profileData.reviews})</Text>
        </View>
        <Text style={s`mx-2 text-gray-400`}>•</Text>
        <Text style={s`text-gray-600`}>{profileData.hours}</Text>
      </View>

      {/* Action Buttons */}
      <View style={s`flex-row mt-3 space-x-2`}>
        <TouchableOpacity
          style={[
            s`flex-1 rounded-lg py-1.5 items-center`,
            isFollowing ? s`bg-gray-100` : { backgroundColor: '#FF3D44' }
          ]}
          onPress={() => setIsFollowing(!isFollowing)}>
          <Text
            style={[
              isFollowing ? s`text-gray-800` : s`text-white`,
              { fontFamily: 'Outfit-Medium' }
            ]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s`flex-1 rounded-lg py-1.5 items-center bg-gray-100`}>
          <Text style={[s`text-gray-800`, { fontFamily: 'Outfit-Medium' }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={handleProfessionalDashBoardScreen}
          style={s`w-12 rounded-lg py-1.5 items-center bg-gray-100`}>
          <MaterialIcons name="dashboard" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={s`flex-row border-t border-gray-200 mt-4`}>
      <TouchableOpacity
        style={[
          s`flex-1 items-center py-3`,
          activeTab === 'grid' && s`border-b-2 border-black`,
        ]}
        onPress={() => setActiveTab('grid')}>
        <Icon
          name="appstore1"
          size={24}
          color={activeTab === 'grid' ? '#000' : '#666'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          s`flex-1 items-center py-3`,
          activeTab === 'list' && s`border-b-2 border-black`,
        ]}
        onPress={() => setActiveTab('list')}>
        <Icon
          name="menuunfold"
          size={24}
          color={activeTab === 'list' ? '#000' : '#666'}
        />
      </TouchableOpacity>
    </View>
  );

  const renderPosts = () => {
    if (isLoading) {
      return (
        <View style={s`flex-1 justify-center items-center py-8`}>
          <ActivityIndicator size="large" color="#FF3D44" />
        </View>
      );
    }

    return (
      <View style={s`flex-row flex-wrap`}>
        {profileData.posts.map((post, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: screenWidth / 3,
              height: screenWidth / 3,
              padding: 1,
            }}>
            <Image
              source={{ uri: post.imageUrl }}
              style={s`w-full h-full`}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfile()}
        {renderTabs()}
        {renderPosts()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;