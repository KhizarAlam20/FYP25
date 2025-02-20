# Use an official Node.js image as the base image
FROM node

# Set the working directory
WORKDIR /app

# Install Android dependencies (for Android builds)
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install watchman for React Native (optional but recommended)
RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    build-essential \
    libtool \
    pkg-config \
    python3 \
    python3-pip \
    && pip3 install --upgrade pip \
    && pip3 install watchman

# Install React Native CLI and other dependencies
RUN npm install -g react-native-cli

# Set environment variables for Android SDK (if required for Android build)
ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH $ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH

# Copy your React Native app into the container
COPY . .

# Install app dependencies
RUN npm install

# Expose necessary ports (for React Native Metro bundler)
EXPOSE 8081

# Set the default command for starting the app (React Native packager)
CMD ["npm", "start"]
