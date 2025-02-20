import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {s} from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET} from "@env"
const UploadContentData = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [uploading, setUploading] = useState(false);

  const {file} = route.params;

  
    
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    price: '',
    images: [],
    addOns: [{name: '', price: ''}],
    deliveryModes: {
      delivery: false,
      pickup: false,
      dineIn: false,
    },
    tags: [],
    currentTag: '',
  });

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      multiple: true,
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) return;

      if (response.assets) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...response.assets],
        }));
      }
    });
  };

  //toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'uploaded!',
      text2: 'Upload Completed...',
      visibilityTime: 3000, // Time to show the toast
    });
  }

  const uploadToCloudinary = async file => {
    console.log('In uploading state...');
    console.log('file uri = ' + file.uri);
    console.log('file type = ' + file.type);
    console.log('file name = ' + file.name);

    setUploading(true);
    try {
      const cloudName = `${CLOUDINARY_CLOUD_NAME}`; // Replace with your Cloudinary cloud name
      const uploadPreset = `${CLOUDINARY_UPLOAD_PRESET}`; // Replace with your upload preset

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      formData.append('upload_preset', uploadPreset);
      showToast()

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('upload complete...');
      setIsUploadComplete(true);

      const data = await response.json();
      if (data.error) {
        Alert.alert('Error', data.error.message);
      } else {
        Alert.alert('Success', 'Video uploaded successfully!');
        console.log('Uploaded URL:', data.secure_url);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  const addNewAddon = () => {
    setFormData(prev => ({
      ...prev,
      addOns: [...prev.addOns, {name: '', price: ''}],
    }));
  };

  const updateAddon = (index, field, value) => {
    const newAddOns = [...formData.addOns];
    newAddOns[index][field] = value;
    setFormData(prev => ({
      ...prev,
      addOns: newAddOns,
    }));
  };

  const addTag = () => {
    if (formData.currentTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: '',
      }));
    }
  };

  const removeTag = index => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    // Implement your upload logic here
    console.log('Submitting food content:', formData);
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white pt-8`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1`}>
        <ScrollView style={s`flex-1 px-6`}>
          {/* Header */}
          <View style={s`items-center my-6`}>
            <Text
              style={[s`text-2xl text-gray-800`, {fontFamily: 'Outfit-Bold'}]}>
              Add Food Item
            </Text>
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />
            
          {/* Food Name Input */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Food Name
            </Text>
            <Text>{file.uri}</Text>
            <View
              style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="food" size={20} color="#666" />
              <TextInput
                style={[
                  s`flex-1 ml-3 text-gray-800`,
                  {fontFamily: 'Outfit-Regular'},
                ]}
                placeholder="Enter food name"
                value={formData.foodName}
                onChangeText={text =>
                  setFormData(prev => ({...prev, foodName: text}))
                }
                placeholderTextColor="#00000050"
              />
            </View>
          </View>

          {/* Image Upload Section */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Food Images
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {formData.images.map((image, index) => (
                <View key={index} style={s`mr-2`}>
                  <Image
                    source={{uri: image.uri}}
                    style={s`w-20 h-20 rounded-lg`}
                  />
                </View>
              ))}
              <TouchableOpacity
                onPress={handleImagePick}
                style={s`w-20 h-20 bg-gray-100 rounded-lg items-center justify-center`}>
                <Icon name="plus" size={24} color="#666" />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Description Input */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Description
            </Text>
            <TextInput
              style={[
                s`bg-gray-100 rounded-xl px-4 py-2 h-24 text-gray-800`,
                {fontFamily: 'Outfit-Regular'},
              ]}
              placeholder="Enter food description"
              multiline
              value={formData.description}
              onChangeText={text =>
                setFormData(prev => ({...prev, description: text}))
              }
              placeholderTextColor="#00000050"
            />
          </View>

          {/* Price Input */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Price
            </Text>
            <View
              style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="dollar" size={20} color="#666" />
              <TextInput
                style={[
                  s`flex-1 ml-3 text-gray-800`,
                  {fontFamily: 'Outfit-Regular'},
                ]}
                placeholder="Enter price"
                keyboardType="decimal-pad"
                value={formData.price}
                onChangeText={text =>
                  setFormData(prev => ({...prev, price: text}))
                }
                placeholderTextColor="#00000050"
              />
            </View>
          </View>

          {/* Add-ons Section */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Add-ons
            </Text>
            {formData.addOns.map((addon, index) => (
              <View key={index} style={s`flex-row mb-2`}>
                <TextInput
                  style={[
                    s`flex-2 bg-gray-100 rounded-xl px-4 py-2 mr-2`,
                    {fontFamily: 'Outfit-Regular'},
                  ]}
                  placeholder="Add-on name"
                  value={addon.name}
                  onChangeText={text => updateAddon(index, 'name', text)}
                  placeholderTextColor="#00000050"
                />
                <TextInput
                  style={[
                    s`flex-1 bg-gray-100 rounded-xl px-4 py-2`,
                    {fontFamily: 'Outfit-Regular'},
                  ]}
                  placeholder="Price"
                  keyboardType="decimal-pad"
                  value={addon.price}
                  onChangeText={text => updateAddon(index, 'price', text)}
                  placeholderTextColor="#00000050"
                />
              </View>
            ))}
            <TouchableOpacity
              onPress={addNewAddon}
              style={s`flex-row items-center justify-center py-2`}>
              <Icon name="plus" size={20} color="#FF3D44" />
              <Text
                style={[s`ml-2 text-primary`, {fontFamily: 'Outfit-Medium'}]}>
                Add More
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Modes */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Delivery Modes
            </Text>
            <View style={s`flex-row justify-between`}>
              {Object.keys(formData.deliveryModes).map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    s`flex-1 py-2 mx-1 rounded-xl items-center`,
                    formData.deliveryModes[mode]
                      ? s`bg-primary`
                      : s`bg-gray-100`,
                  ]}
                  onPress={() =>
                    setFormData(prev => ({
                      ...prev,
                      deliveryModes: {
                        ...prev.deliveryModes,
                        [mode]: !prev.deliveryModes[mode],
                      },
                    }))
                  }>
                  <Text
                    style={[
                      formData.deliveryModes[mode]
                        ? s`text-white`
                        : s`text-gray-600`,
                      {fontFamily: 'Outfit-Medium'},
                    ]}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags Section */}
          <View style={s`mb-4`}>
            <Text
              style={[s`text-gray-500 mb-2`, {fontFamily: 'Outfit-Medium'}]}>
              Tags
            </Text>
            <View style={s`flex-row flex-wrap mb-2`}>
              {formData.tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => removeTag(index)}
                  style={s`bg-gray-100 rounded-full px-3 py-1 m-1 flex-row items-center`}>
                  <Text
                    style={[
                      s`text-gray-600 mr-1`,
                      {fontFamily: 'Outfit-Regular'},
                    ]}>
                    {tag}
                  </Text>
                  <Icon name="close" size={16} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
            <View style={s`flex-row`}>
              <TextInput
                style={[
                  s`flex-1 bg-gray-100 rounded-xl px-4 py-2 mr-2`,
                  {fontFamily: 'Outfit-Regular'},
                ]}
                placeholder="Add a tag"
                value={formData.currentTag}
                onChangeText={text =>
                  setFormData(prev => ({...prev, currentTag: text}))
                }
                onSubmitEditing={addTag}
                placeholderTextColor="#00000050"
              />
              <TouchableOpacity
                onPress={addTag}
                style={s`bg-primary px-4 rounded-xl justify-center`}>
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[s`rounded-2xl py-4 mb-6 items-center bg-primary`]}
            onPress={() => uploadToCloudinary(file)}>
            <Text
              style={[s`text-white text-xl`, {fontFamily: 'Outfit-Medium'}]}>
              Upload Food Item
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadContentData;
