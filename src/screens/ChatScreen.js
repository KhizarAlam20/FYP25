import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for stories
  const stories = [
    { id: 'my-story', isMyStory: true, username: 'Your Story', hasUpdate: false },
    { id: '1', username: 'john_doe', hasUpdate: true, isOnline: true },
    { id: '2', username: 'jane_smith', hasUpdate: true, isOnline: true },
    { id: '3', username: 'mike_wilson', hasUpdate: false, isOnline: false },
  ];

  // Mock data for chats
  const chats = [
    {
      id: '1',
      username: 'john_doe',
      lastMessage: 'Hey, is the food ready?',
      time: '2m ago',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      username: 'jane_smith',
      lastMessage: 'Your order is being prepared...',
      time: '15m ago',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '3',
      username: 'mike_wilson',
      lastMessage: 'Thanks for the delivery!',
      time: '1h ago',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity
      style={s`items-center mr-4`}
      onPress={() => console.log('View story:', item.username)}>
      <View
        style={[
          s`relative`,
          item.hasUpdate && s`p-0.5 bg-gradient-to-tr from-red-500 to-purple-500 rounded-full`,
        ]}>
        <View style={s`${item.isMyStory ? 'p-0.5' : 'p-0.5'} bg-white rounded-full`}>
          <View
            style={[
              s`w-16 h-16 rounded-full overflow-hidden`,
              item.isMyStory && s`border-2 border-gray-200`,
            ]}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              style={s`w-full h-full`}
            />
            {item.isMyStory && (
              <View
                style={s`absolute bottom-0 right-0 bg-primary rounded-full w-6 h-6 items-center justify-center border-2 border-white`}>
                <Icon name="plus" size={14} color="white" />
              </View>
            )}
          </View>
        </View>
        {item.isOnline && !item.isMyStory && (
          <View
            style={s`absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white`}
          />
        )}
      </View>
      <Text
        style={[
          s`text-xs mt-1 text-gray-800`,
          { fontFamily: 'Outfit-Medium' },
        ]}>
        {item.username}
      </Text>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={s`flex-row items-center px-4 py-3`}
      onPress={() => navigation.navigate('ChatDetailScreen', { chat: item })}>
      <View style={s`relative`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={s`w-12 h-12 rounded-full`}
        />
        {item.isOnline && (
          <View
            style={s`absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white`}
          />
        )}
      </View>
      <View style={s`flex-1 ml-3`}>
        <View style={s`flex-row justify-between items-center`}>
          <Text
            style={[s`text-gray-800 text-base`, { fontFamily: 'Outfit-Medium' }]}>
            {item.username}
          </Text>
          <Text
            style={[s`text-gray-500 text-xs`, { fontFamily: 'Outfit-Regular' }]}>
            {item.time}
          </Text>
        </View>
        <View style={s`flex-row justify-between items-center`}>
          <Text
            style={[
              s`text-gray-500 text-sm`,
              { fontFamily: 'Outfit-Regular' },
            ]}
            numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View
              style={s`bg-primary rounded-full w-5 h-5 items-center justify-center`}>
              <Text
                style={[s`text-white text-xs`, { fontFamily: 'Outfit-Medium' }]}>
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {/* Header */}
      <View style={s`px-4 py-2 flex-row justify-between items-center border-b border-gray-100`}>
        <Text style={[s`text-2xl text-gray-800`, { fontFamily: 'Outfit-Bold' }]}>
          Messages
        </Text>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="#FF3D44" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={s`px-4 py-2`}>
        <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
          <Icon name="search1" size={20} color="#666" />
          <TextInput
            style={[s`flex-1 ml-3 text-gray-800`, { fontFamily: 'Outfit-Regular' }]}
            placeholder="Search messages"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#00000050"
          />
        </View>
      </View>

      {/* Stories */}
      <View style={s`border-b border-gray-100`}>
        <FlatList
          data={stories}
          renderItem={renderStoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s`p-4`}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;