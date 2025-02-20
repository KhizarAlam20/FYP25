import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
  primary: '#FFD700', // Gold
  background: '#000000', // Black
  card: '#1A1A1A', // Slightly lighter black for cards
  text: '#FFFFFF', // White text
  subtext: '#BBBBBB', // Light gray for secondary text
  success: '#4CAF50', // Green for success stories
  divider: '#333333', // Dark gray for dividers
};

const UserCommunityScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  const communityData = {
    discussions: [
      {
        id: 1,
        user: 'Sarah Chen',
        avatar: 'SC',
        title: 'How to handle async/await in React?',
        content: 'I\'m struggling with async operations in my React components...',
        likes: 24,
        replies: 8,
        tags: ['React', 'JavaScript'],
        timeAgo: '2h ago',
        isAnswered: true,
      },
      {
        id: 2,
        user: 'Mike Ross',
        avatar: 'MR',
        title: 'Successfully deployed my first full-stack app! 🎉',
        content: 'After completing the deployment module, I finally managed to...',
        likes: 156,
        replies: 42,
        tags: ['Success Story', 'Deployment'],
        timeAgo: '5h ago',
        isSuccess: true,
      },
    ],
    topContributors: [
      {
        user: 'David Kim',
        avatar: 'DK',
        points: 1250,
        helpfulAnswers: 89,
      },
      {
        user: 'Lisa Wang',
        avatar: 'LW',
        points: 980,
        helpfulAnswers: 64,
      },
    ],
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Community</Text>
      <TouchableOpacity>
        <Icon name="notifications" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color={COLORS.subtext} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search discussions..."
        placeholderTextColor={COLORS.subtext}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.newPostButton}>
        <Icon name="edit" size={20} color={COLORS.background} />
        <Text style={styles.newPostButtonText}>New Post</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabs}>
      {['discussions', 'success stories', 'my posts'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
          onPress={() => setSelectedTab(tab)}
        >
          <Icon 
            name={
              tab === 'discussions' ? 'forum' :
              tab === 'success stories' ? 'emoji-events' : 'person'
            }
            size={24}
            color={selectedTab === tab ? COLORS.primary : COLORS.subtext}
          />
          <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPost = (post) => (
    <TouchableOpacity key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.avatar}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{post.user}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="more-vert" size={20} color={COLORS.subtext} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent} numberOfLines={3}>{post.content}</Text>
      
      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <View key={index} style={[
            styles.tag,
            post.isSuccess && styles.successTag,
            post.isAnswered && styles.answeredTag,
          ]}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.postStats}>
        <TouchableOpacity style={styles.statButton}>
          <Icon name="thumb-up" size={16} color={COLORS.subtext} />
          <Text style={styles.statText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Icon name="comment" size={16} color={COLORS.subtext} />
          <Text style={styles.statText}>{post.replies}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Icon name="bookmark-border" size={16} color={COLORS.subtext} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderTopContributors = () => (
    <View style={styles.contributorsSection}>
      <Text style={styles.sectionTitle}>Top Contributors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {communityData.topContributors.map((contributor, index) => (
          <TouchableOpacity key={index} style={styles.contributorCard}>
            <View style={styles.contributorAvatar}>
              <Text style={styles.avatarText}>{contributor.avatar}</Text>
            </View>
            <Text style={styles.contributorName}>{contributor.user}</Text>
            <Text style={styles.contributorPoints}>{contributor.points} pts</Text>
            <Text style={styles.helpfulAnswers}>
              {contributor.helpfulAnswers} helpful answers
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView}>
        {renderSearchBar()}
        {renderTabs()}
        {renderTopContributors()}
        <View style={styles.postsContainer}>
          {communityData.discussions.map(post => renderPost(post))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingLeft: 40,
    color: COLORS.text,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  newPostButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.subtext,
    fontSize: 12,
    marginTop: 4,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  contributorsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contributorCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 150,
  },
  contributorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contributorName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contributorPoints: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  helpfulAnswers: {
    color: COLORS.subtext,
    fontSize: 12,
    textAlign: 'center',
  },
  postsContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeAgo: {
    color: COLORS.subtext,
    fontSize: 12,
  },
  postTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    color: COLORS.subtext,
    fontSize: 14,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  successTag: {
    backgroundColor: COLORS.success,
  },
  answeredTag: {
    backgroundColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  postStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 12,
    gap: 16,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: COLORS.subtext,
    fontSize: 14,
  },
});

export default UserCommunityScreen;