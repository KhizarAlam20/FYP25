import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {s} from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import FoodDetection from '../components/FoodDetection';
import {useFoodContext} from '../Context/FoodContext';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET} from "@env"

const AddScreen = ({navigation}) => {
  const [pickedVideo, setPickedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef(null);
  const [file, setFile] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const {showButton, setShowButton} = useFoodContext();

  useEffect(() => {
    console.log('=================   File data ============= ', file.uri);
  }, [showButton]);

  // FRAME EXTRACTION LOGIC
  const [frames, setFrames] = useState([]); 
  const [isLoadingS, setIsLoadingS] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Function to get the real path for Android
  const getAndroidRealPath = async uri => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      const destPath = `${RNFS.CachesDirectoryPath}/${Date.now()}.mp4`;

      // Copy the file to app's cache directory
      await RNFS.copyFile(uri, destPath);

      // Verify the copied file
      const exists = await RNFS.exists(destPath);
      if (!exists) throw new Error('File copy failed');

      return destPath;
    }
    return uri;
  };

  const handleContentDetailsScreen=()=>{
    navigation.navigate('UploadContentData',{
      file:file
    })
  }

  // Function to clear existing frames before processing a new video
  const clearExistingFrames = async () => {
    try {
      const files = await RNFS.readDir(RNFS.CachesDirectoryPath);
      const deletePromises = files
        .filter(file => file.name.match(/(frame_\d+\.png|\.mp4$)/))
        .map(file => RNFS.unlink(file.path));

      await Promise.all(deletePromises);

      // Add a small delay after clearing files to ensure cleanup
      await delay(500); // 500ms delay can be adjusted
    } catch (err) {
      console.log('Error clearing files:', err);
    }
  };

  // Function to process video and extract frames
  const processVideo = async videoUri => {
    try {
      setIsLoadingS(true);
      setError('');
      setShowButton(false);
      setUploadError(null);
      setFrames([]); // Reset frames at the beginning of each new process

      // Clear previous frames
      await clearExistingFrames();

      // Convert content URI to actual file path on Android
      const processedUri = await getAndroidRealPath(videoUri);

      // Use a unique identifier (timestamp) for the output frames
      const timestamp = Date.now();
      const outputPath = `${RNFS.CachesDirectoryPath}/frame_${timestamp}_%03d.png`;

      // FFmpeg command to extract frames
      const command = `-y -i "${processedUri}" -vf "fps=1" -qscale:v 2 ${outputPath}`;

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();
      const output = await session.getOutput();

      console.log('FFmpeg output:', output);

      // Check if FFmpeg ran successfully
      if (!ReturnCode.isSuccess(returnCode)) {
        throw new Error(`FFmpeg error: ${output}`);
      }

      // Read the frames from the cache directory and filter the ones extracted
      const files = await RNFS.readDir(RNFS.CachesDirectoryPath);
      const framePaths = files
        .filter(file =>
          file.name.match(new RegExp(`frame_${timestamp}_\\d+\\.png`)),
        ) // Match files with timestamp
        .sort((a, b) => {
          const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
          return numA - numB;
        })
        .map(file => `file://${file.path}`);

      setFrames(framePaths); // Set the frames in the state
    } catch (err) {
      setError(err.message || 'Failed to process video');
      console.error('Processing error:', err);
    } finally {
      setIsLoadingS(false);
    }
  };

  // Function to pick a video from the device
  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      setFile({
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name
      });

      if (res[0]?.uri) {
        setPickedVideo(res[0]);
        // setUploadError(null);
        await processVideo(res[0].uri);
      }

      // await uploadToCloudinary(file);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setError('Error picking video');
      }
    }
  };

  ///////////////////////////////

  const validateVideoDuration = duration => {
    const durationInSeconds = duration;
    return durationInSeconds > 0 && durationInSeconds <= 20;
  };

  const handleVideoLoad = meta => {
    const duration = meta.duration;
    setVideoDuration(duration);

    if (!validateVideoDuration(duration)) {
      setUploadError('Video must be between 1-20 seconds long');
      setPickedVideo(null);
    }
  };

  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    console.log("In uploading state...")
    setUploading(true);
    try {
      const cloudName = `${CLOUDINARY_CLOUD_NAME}`; 
      const uploadPreset = `${CLOUDINARY_UPLOAD_PRESET}`; 

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("upload complete...")

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

  const handleVideoPick = () => {
    const options = {
      mediaType: 'video',
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets[0].uri) {
        setPickedVideo(response.assets[0]);

        setUploadError(null);
      }
    });
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 justify-center`}>
        {/* Header */}
        <View style={s`items-center mb-12`}>
          <Text
            style={[s`text-2xl text-gray-800`, {fontFamily: 'Outfit Bold'}]}>
            Upload Video
          </Text>
        </View>

        {/* Main Content */}
        <View style={s`px-10`}>
          {/* Upload Box */}
          <TouchableOpacity
            onPress={pickVideo}
            style={s`border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 items-center justify-center ${
              pickedVideo ? 'bg-gray-50' : 'bg-white'
            }`}>
            {!pickedVideo ? (
              <>
                <Icon name="videocamera" size={40} color="#FF3D44" />
                <Text
                  style={[
                    s`text-gray-500 mt-4 text-center`,
                    {fontFamily: 'Outfit-Regular'},
                  ]}>
                  Upload your video here
                </Text>
                <Text
                  style={[
                    s`text-gray-400 mt-2 text-sm text-center`,
                    {fontFamily: 'Outfit-Regular'},
                  ]}>
                  Video must be 1-20 seconds long
                </Text>
              </>
            ) : (
              <View style={s`w-full h-64`}>
                <Video
                  ref={videoRef}
                  source={{uri: pickedVideo.uri}}
                  style={s`w-full h-full rounded-lg`}
                  controls
                  resizeMode="contain"
                  onLoad={handleVideoLoad}
                />
                {videoDuration > 0 && validateVideoDuration(videoDuration) && (
                  <Text
                    style={[
                      s`text-green-500 mt-2 text-center`,
                      {fontFamily: 'Outfit-Regular'},
                    ]}>
                    Duration: {videoDuration.toFixed(1)} seconds
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>

          {/* Error Message */}
          {uploadError && (
            <View
              style={s`flex-row items-center bg-red-100 rounded-xl px-4 py-3 mb-6`}>
              <Icon name="closecircle" size={20} color="#FF3D44" />
              <Text
                style={[s`ml-2 text-red-500`, {fontFamily: 'Outfit-Regular'}]}>
                {uploadError}
              </Text>
            </View>
          )}

          {/* FRAME ECTRATOR */}
          {isLoadingS && (
            <View style={styles.loadingContainer}>
              <Text>Checking...</Text>
            </View>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* If frames are extracted, pass them to the FoodDetection component */}
          {frames.length > 0 ? <FoodDetection frames={frames} /> : null}

          {/* Upload Button */}
          {pickedVideo &&
            !isLoading &&
            showButton &&
            validateVideoDuration(videoDuration) && (
              <TouchableOpacity
                style={[
                  s`rounded-2xl py-4 mb-6 items-center`,
                  {backgroundColor: '#FF3D44'},
                ]}
                // onPress={() => uploadToCloudinary(file)}>
                onPress={handleContentDetailsScreen}>
                {/* <Text>{pickedVideo}</Text> */}
                <Text
                  style={[
                    s`text-white text-xl`,
                    {fontFamily: 'Outfit-Medium'},
                  ]}>
                  Add details
                </Text>
              </TouchableOpacity>
            )}

          {/* Loading State */}
          {isLoading && (
            <View style={s`items-center py-4 mb-6`}>
              <ActivityIndicator size="large" color="#FF3D44" />
              <Text
                style={[s`mt-2 text-gray-600`, {fontFamily: 'Outfit-Regular'}]}>
                Uploading video...
              </Text>
            </View>
          )}

          {/* Guidelines */}
          <View style={s`mt-6`}>
            <Text
              style={[
                s`text-gray-500 text-center`,
                {fontFamily: 'Outfit-Regular'},
              ]}>
              Video requirements:
            </Text>
            <Text
              style={[
                s`text-gray-500 text-center mt-1`,
                {fontFamily: 'Outfit-Regular'},
              ]}>
              • 1-20 seconds in length
            </Text>
            <Text
              style={[
                s`text-gray-500 text-center mt-1`,
                {fontFamily: 'Outfit-Regular'},
              ]}>
              • MP4 or MOV format
            </Text>
            <Text
              style={[
                s`text-gray-500 text-center mt-1`,
                {fontFamily: 'Outfit-Regular'},
              ]}>
              • Maximum size: 50MB
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
