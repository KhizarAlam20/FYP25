import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
  primary: '#FFD700', // Gold
  background: '#000000', // Black
  card: '#1A1A1A', // Slightly lighter black
  text: '#FFFFFF', // White
  subtext: '#BBBBBB', // Light gray
  success: '#4CAF50', // Green
  divider: '#333333', // Dark gray
};

const CourseHomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Business', 'Marketing'];
  
  const featuredCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'John Doe',
      duration: '20 hours',
      rating: 4.8,
      price: 89.99,
      image: 'https://your-image-url.com/web-dev.jpg',
      category: 'Development'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      instructor: 'Jane Smith',
      duration: '15 hours',
      rating: 4.9,
      price: 79.99,
      image: 'https://your-image-url.com/design.jpg',
      category: 'Design'
    },
    // Add more courses as needed
  ];

  const myCourses = [
    {
      id: 1,
      title: 'React Native for Beginners',
      progress: 60,
      lastAccessed: '2 days ago',
      nextLesson: 'Building Custom Components',
      image: 'https://your-image-url.com/react-native.jpg'
    },
    // Add more courses as needed
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>Alex</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCategories = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMyCourses = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {myCourses.map(course => (
          <TouchableOpacity 
            key={course.id}
            style={styles.myCourseCard}
            onPress={() => navigation.navigate('CourseScreen', { courseId: course.id })}
          >
            <View style={styles.courseImageContainer}>
              <Image
                source={{ uri: '/api/placeholder/400/320' }}
                style={styles.courseImage}
              />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.title}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{course.progress}% Complete</Text>
              <View style={styles.nextLesson}>
                <Icon name="play-circle-outline" size={16} color={COLORS.primary} />
                <Text style={styles.nextLessonText} numberOfLines={1}>
                  {course.nextLesson}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedCourses = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredCourses
          .filter(course => selectedCategory === 'All' || course.category === selectedCategory)
          .map(course => (
            <TouchableOpacity 
              key={course.id}
              style={styles.featuredCourseCard}
              onPress={() => navigation.navigate('CourseScreen', { courseId: course.id })}
            >
              <Image
                source={{ uri: '/api/placeholder/400/320' }}
                style={styles.featuredCourseImage}
              />
              <View style={styles.featuredCourseInfo}>
                <Text style={styles.featuredCourseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.instructorName}>{course.instructor}</Text>
                <View style={styles.courseStats}>
                  <View style={styles.stat}>
                    <Icon name="star" size={16} color={COLORS.primary} />
                    <Text style={styles.statText}>{course.rating}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Icon name="access-time" size={16} color={COLORS.primary} />
                    <Text style={styles.statText}>{course.duration}</Text>
                  </View>
                </View>
                <Text style={styles.price}>${course.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderMyCourses()}
        {renderFeaturedCourses()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: COLORS.subtext,
    fontSize: 16,
  },
  userName: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  myCourseCard: {
    width: 280,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginLeft: 16,
    overflow: 'hidden',
  },
  courseImageContainer: {
    height: 140,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.divider,
    borderRadius: 2,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    color: COLORS.subtext,
    fontSize: 12,
    marginBottom: 8,
  },
  nextLesson: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextLessonText: {
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 4,
  },
  featuredCourseCard: {
    width: 240,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginLeft: 16,
    overflow: 'hidden',
  },
  featuredCourseImage: {
    width: '100%',
    height: 135,
  },
  featuredCourseInfo: {
    padding: 12,
  },
  featuredCourseTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructorName: {
    color: COLORS.subtext,
    fontSize: 14,
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 4,
  },
  price: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseHomeScreen;