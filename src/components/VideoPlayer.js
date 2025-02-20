import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ videoUrl, paused, onTogglePlayPause }) => {
  return (
    <TouchableWithoutFeedback onPress={onTogglePlayPause}>
      <View style={styles.reelContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={paused}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  reelContainer: {
    flex: 1,
    width: '100%',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default VideoPlayer;
