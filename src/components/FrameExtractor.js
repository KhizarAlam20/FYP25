import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import FoodDetection from './FoodDetection'; 

// Function to introduce a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const FrameExtractor = () => {
  const [frames, setFrames] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(''); 

  // Function to get the real path for Android
  const getAndroidRealPath = async (uri) => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      const filePath = `${RNFS.CachesDirectoryPath}/${Date.now()}.mp4`;
      await RNFS.copyFile(uri, filePath);
      return filePath;
    }
    return uri;
  };

  // Function to clear existing frames before processing a new video
  const clearExistingFrames = async () => {
    try {
      const files = await RNFS.readDir(RNFS.CachesDirectoryPath);
      const deletePromises = files
        .filter(file => file.name.match(/(frame_\d+\.png|\.mp4$)/))
        .map(file => RNFS.unlink(file.path));

      await Promise.all(deletePromises);

      await delay(500); // 500ms delay can be adjusted
    } catch (err) {
      console.log('Error clearing files:', err);
    }
  };

  // Function to process video and extract frames
  const processVideo = async (videoUri) => {
    try {
      setIsLoading(true);
      setError('');
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
        .filter(file => file.name.match(new RegExp(`frame_${timestamp}_\\d+\\.png`))) // Match files with timestamp
        .sort((a, b) => {
          const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
          return numA - numB;
        })
        .map(file => `file://${file.path}`);

      setFrames(framePaths); 
    } catch (err) {
      setError(err.message || 'Failed to process video');
      console.error('Processing error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to pick a video from the device
  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      if (res[0]?.uri) {
        await processVideo(res[0].uri);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setError('Error picking video');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Video" onPress={pickVideo} disabled={isLoading} />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Extracting frames...</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* If frames are extracted, pass them to the FoodDetection component */}
      {frames.length > 0 ? (
        <FoodDetection frames={frames} />
      ) : null}
    </View>
  );
};

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

export default FrameExtractor;
