import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey, is the food ready?',
      time: '2:30 PM',
      isSender: false,
    },
    {
      id: '2',
      text: 'Yes, we\'re preparing it now. It will be ready in 10 minutes.',
      time: '2:31 PM',
      isSender: true,
    },
    {
      id: '3',
      text: 'Great, thanks!',
      time: '2:31 PM',
      isSender: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        s`flex-row mb-2`,
        item.isSender ? s`justify-end` : s`justify-start`,
      ]}>
      <View
        style={[
          s`max-w-3/4 rounded-2xl px-4 py-2`,
          item.isSender
            ? s`bg-primary rounded-br-none`
            : s`bg-gray-100 rounded-bl-none`,
        ]}>
        <Text
          style={[
            item.isSender ? s`text-white` : s`text-gray-800`,
            { fontFamily: 'Outfit-Regular' },
          ]}>
          {item.text}
        </Text>
        <Text
          style={[
            s`text-xs mt-1`,
            item.isSender ? s`text-white opacity-80` : s`text-gray-500`,
            { fontFamily: 'Outfit-Regular' },
          ]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {/* Header */}
      <View style={s`px-4 py-2 flex-row items-center border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={24} color="#666" />
        </TouchableOpacity>
        <View style={s`flex-row items-center flex-1 ml-3`}>
          <View style={s`relative`}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={s`w-10 h-10 rounded-full`}
            />
            {chat.isOnline && (
              <View
                style={s`absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white`}
              />
            )}
          </View>
          <View style={s`ml-3`}>
            <Text
              style={[s`text-gray-800 text-base`, { fontFamily: 'Outfit-Medium' }]}>
              {chat.username}
            </Text>
            {chat.isOnline && (
              <Text
                style={[s`text-gray-500 text-xs`, { fontFamily: 'Outfit-Regular' }]}>
                Active now
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="phone" size={24} color="#FF3D44" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={s`p-4`}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={s`px-4 py-2 flex-row items-center border-t border-gray-100`}>
          <TouchableOpacity style={s`mr-2`}>
            <Icon name="plus" size={24} color="#666" />
          </TouchableOpacity>
          <View
            style={s`flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2`}>
            <TextInput
              style={[s`flex-1 text-gray-800`, { fontFamily: 'Outfit-Regular' }]}
              placeholder="Message..."
              value={message}
              onChangeText={setMessage}
              multiline
              placeholderTextColor="#00000050"
            />
            <TouchableOpacity onPress={sendMessage}>
              <Icon
                name="send"
                size={24}
                color={message.trim() ? '#FF3D44' : '#666'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;