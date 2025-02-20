import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import ProgressBar from 'react-native-progress/Bar';
import {useFoodContext} from '../Context/FoodContext';

const foodLabels = [
  'food',
  'water',
  'juice',
  'apple',
  'banana',
  'orange',
  'pizza',
  'burger',
  'salad',
  'cake',
  'H2O',
  'h2o',
  'H2o',
  'meat',
  'bbq',
  'vegetables',
];
import {CLARIFAI_API_KEY, CLARIFAI_APP_ID, CLARIFAI_USER_ID} from "@env"

const FoodDetection = ({frames}) => {
  const [detectedResults, setDetectedResults] = useState({});
  const [error, setError] = useState('');
  const [testPassed, setTestPassed] = useState(false); 
  const [progress, setProgress] = useState(0); 

  const {showButton,setShowButton} = useFoodContext();

  const apiKey = `${CLARIFAI_API_KEY}`;
  const userId = `${CLARIFAI_USER_ID}`;
  const appId =  `${CLARIFAI_APP_ID}`;
  const clarifaiApiUrl =
    'https://api.clarifai.com/v2/models/general-image-recognition/outputs';

  useEffect(() => {
    console.log('Food detected:', showButton);
  }, [showButton]);
  
  useEffect(() => {
    const processFrames = async () => {
      console.log('IN_FOOD_DETECTION');
      setError('');
      setTestPassed(false); // Reset test passed state 

      try {
        if (!frames || !frames.length) {
          throw new Error('No frames provided');
        }

        const totalFrames = frames.length;
        let processedFrames = 0;

        console.log('Resizing frames');
        const optimizedFrames = await Promise.all(
          frames.map(async (uri, index) => {
            try {
              const resized = await ImageResizer.createResizedImage(
                uri,
                224,
                224,
                'JPEG',
                80,
                0,
              );
              return resized.uri;
            } catch (resizeError) {
              console.warn(`Error resizing frame ${index}:`, resizeError);
              return uri; // Fallback to original URI
            }
          }),
        );

        console.log('Encoding frames to base64');
        const base64Images = await Promise.all(
         
          optimizedFrames.map(async (uri, index) => {
            try {
              return await RNFS.readFile(uri, 'base64');
            } catch (readError) {
              console.warn(`Error reading frame ${index}:`, readError);
              return null;
            }
          }),
        );

        console.log('Sending frames to Clarifai');
        const validImages = base64Images.filter(img => img !== null);
        if (!validImages.length) {
          throw new Error('Failed to process all frames');
        }

        console.log('Processing frames');
        const batchRequest = {
          user_app_id: {user_id: userId, app_id: appId},
          inputs: validImages.map((base64, index) => ({
            data: {image: {base64}},
            id: `frame_${index}`,
          })),
        };

        console.log('Waiting for API response');
        const response = await axios.post(clarifaiApiUrl, batchRequest, {
          headers: {
            Authorization: `Key ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        });

        if (!response.data?.outputs) {
          throw new Error('Invalid API response structure');
        }

        console.log('Processing API results');
        const results = response.data.outputs.reduce((acc, output, index) => {
          try {
            console.log('Converting frames');
            const labels = output.data.concepts.map(c => c.name);
            const isFoodFound = labels.some(label =>
              foodLabels.includes(label.toLowerCase()),
            );
            acc[output.input.id] = {isFoodFound, labels};

            if (isFoodFound) {
              setShowButton(true); // Show upload button if food is detected
              console.log('Food detected = ',showButton);

              setTestPassed(true);
            }
          } catch (parseError) {
            console.warn('Error processing API output:', parseError);
          }

          processedFrames += 1;
          setProgress(processedFrames / totalFrames);

          return acc;
        }, {});

        setDetectedResults(results);
      } catch (err) {
        console.error('Processing error:', err);
        setError(`Error: ${err.message || 'Failed to process frames'}`);
      }
    };

    processFrames();
  }, [frames]);

  const renderFrame = ({item, index}) => {
    const frameResult = detectedResults[`frame_${index}`];

    return <View style={styles.frameContainer}></View>;
  };

  return (
    <View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {testPassed ? (
            <Text style={styles.successMessage}>
              your video is ready for upload
            </Text>
          ) : (
            <Text style={styles.FailureMessage}>
              Please upload a content containing food
            </Text>
          )}

          {progress < 1 && (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={styles.loader}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 40,
    // justifyContent: 'center',
  },
  successMessage: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  FailureMessage: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    // textAlign: 'center',
    marginTop: 10,
  },
  successText: {
    color: '#4CAF50',
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#D32F2F',
    marginTop: 5,
    fontSize: 14,
    // textAlign: 'center',
  },
  processingText: {
    fontSize: 14,
    // textAlign: 'center',
    color: '#888',
    marginTop: 5,
  },
  flatList: {
    marginTop: 20,
  },
  frameContainer: {
    // alignItems: 'center',
    marginBottom: 16,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  frame: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  progressBar: {
    marginBottom: 20,
    borderRadius: 5,
  },
  emptyMessage: {
    // textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
});

export default FoodDetection;
