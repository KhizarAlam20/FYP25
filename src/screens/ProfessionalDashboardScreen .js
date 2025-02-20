import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const ProfessionalDashboardScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [periodFilter, setPeriodFilter] = useState('weekly');
  
  // Mock data for dashboard
  const dashboardData = {
    businessName: "Pasta Paradise",
    ownerName: "John Romano",
    totalEarnings: "$5,842.50",
    pendingPayments: "$420.75",
    totalOrders: 184,
    completedOrders: 176,
    cancelledOrders: 8,
    pendingOrders: 3,
    averageRating: 4.8,
    totalReviews: 142,
    riderRequests: 5,
    topSellingItems: [
      { name: "Spaghetti Carbonara", sold: 86, revenue: "$1,290.00", image: "https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg" },
      { name: "Margherita Pizza", sold: 74, revenue: "$1,110.00", image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg" },
      { name: "Tiramisu", sold: 65, revenue: "$455.00", image: "https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg" }
    ],
    recentOrders: [
      { id: "#ORD8294", customer: "Emma Wilson", items: 3, total: "$42.50", status: "Completed", time: "20 min ago" },
      { id: "#ORD8293", customer: "David Chen", items: 2, total: "$28.75", status: "In Transit", time: "45 min ago" },
      { id: "#ORD8290", customer: "Sarah Johnson", items: 4, total: "$56.25", status: "Completed", time: "1 hour ago" },
      { id: "#ORD8287", customer: "Michael Brown", items: 1, total: "$18.50", status: "Completed", time: "3 hours ago" }
    ],
    recentReviews: [
      { customer: "Amy Lee", rating: 5, comment: "Best pasta in town! Fast delivery too.", time: "2 days ago" },
      { customer: "Robert Garcia", rating: 4, comment: "Great food but delivery was slightly delayed.", time: "3 days ago" },
      { customer: "Jennifer Moore", rating: 5, comment: "Authentic taste, just like in Italy!", time: "5 days ago" }
    ],
    riderRequestsList: [
      { rider: "Carlos Martinez", orderId: "#ORD8294", distance: "1.2 mi", estimatedTime: "15 min", status: "Pending" },
      { rider: "Lisa Wong", orderId: "#ORD8293", distance: "0.8 mi", estimatedTime: "10 min", status: "Accepted" },
      { rider: "James Wilson", orderId: "#ORD8290", distance: "2.1 mi", estimatedTime: "22 min", status: "Completed" },
      { rider: "Sophia Kim", orderId: "#ORD8287", distance: "1.5 mi", estimatedTime: "18 min", status: "Completed" },
      { rider: "Miguel Rodriguez", orderId: "#ORD8285", distance: "1.8 mi", estimatedTime: "20 min", status: "Pending" }
    ],
    salesData: {
      weekly: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [420, 380, 450, 520, 590, 620, 580],
            color: (opacity = 1) => `rgba(78, 42, 175, ${opacity})`,
            strokeWidth: 2
          }
        ]
      },
      monthly: {
        labels: ["W1", "W2", "W3", "W4"],
        datasets: [
          {
            data: [1850, 2200, 2050, 2450],
            color: (opacity = 1) => `rgba(78, 42, 175, ${opacity})`,
            strokeWidth: 2
          }
        ]
      }
    },
    categoryPerformance: {
      labels: ["Pasta", "Pizza", "Dessert", "Drinks"],
      datasets: [
        {
          data: [35, 28, 20, 17],
          colors: [
            (opacity = 1) => `rgba(78, 42, 175, ${opacity})`,
            (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
            (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
            (opacity = 1) => `rgba(234, 179, 8, ${opacity})`
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(78, 42, 175, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: true,
    propsForLabels: {
      fontSize: 10,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#ffffff"
    }
  };

  const renderHeader = () => (
    <View style={s`flex-row justify-between items-center px-5 py-4 bg-indigo-800`}>
      <View>
        <Text style={s`text-lg text-white font-bold`}>{dashboardData.businessName}</Text>
        <Text style={s`text-sm text-indigo-200`}>Welcome back, {dashboardData.ownerName}</Text>
      </View>
      <View style={s`flex-row`}>
        <TouchableOpacity style={s`mr-5`}>
          <Icon name="bell-outline" size={26} color="#ffffff" />
          <View style={s`absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center`}>
            <Text style={s`text-xs text-white font-bold`}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="account-circle-outline" size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickStats = () => (
    <View style={s`mx-4 -mt-5 bg-white rounded-xl shadow-md p-4 mb-4`}>
      <Text style={s`text-lg font-bold mb-3 text-gray-800`}>Quick Stats</Text>
      <View style={s`flex-row flex-wrap`}>
        <View style={s`w-1/2 p-2`}>
          <View style={s`bg-indigo-50 p-3 rounded-xl`}>
            <View style={s`flex-row items-center`}>
              <View style={s`w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mr-3`}>
                <Icon name="currency-usd" size={24} color="#4f46e5" />
              </View>
              <View>
                <Text style={s`text-sm text-gray-500`}>Total Earnings</Text>
                <Text style={s`text-lg font-bold text-gray-800`}>{dashboardData.totalEarnings}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={s`w-1/2 p-2`}>
          <View style={s`bg-orange-50 p-3 rounded-xl`}>
            <View style={s`flex-row items-center`}>
              <View style={s`w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3`}>
                <Icon name="shopping" size={24} color="#f97316" />
              </View>
              <View>
                <Text style={s`text-sm text-gray-500`}>Total Orders</Text>
                <Text style={s`text-lg font-bold text-gray-800`}>{dashboardData.totalOrders}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={s`w-1/2 p-2`}>
          <View style={s`bg-blue-50 p-3 rounded-xl`}>
            <View style={s`flex-row items-center`}>
              <View style={s`w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3`}>
                <Icon name="check-circle-outline" size={24} color="#0ea5e9" />
              </View>
              <View>
                <Text style={s`text-sm text-gray-500`}>Completed</Text>
                <Text style={s`text-lg font-bold text-gray-800`}>{dashboardData.completedOrders}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={s`w-1/2 p-2`}>
          <View style={s`bg-yellow-50 p-3 rounded-xl`}>
            <View style={s`flex-row items-center`}>
              <View style={s`w-10 h-10 bg-yellow-100 rounded-full items-center justify-center mr-3`}>
                <Icon name="star" size={24} color="#eab308" />
              </View>
              <View>
                <Text style={s`text-sm text-gray-500`}>Avg. Rating</Text>
                <Text style={s`text-lg font-bold text-gray-800`}>{dashboardData.averageRating} <Text style={s`text-sm font-normal text-gray-500`}>({dashboardData.totalReviews})</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSalesChart = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <View style={s`flex-row justify-between items-center mb-4`}>
        <Text style={s`text-lg font-bold text-gray-800`}>Sales Overview</Text>
        <View style={s`flex-row bg-gray-100 rounded-lg overflow-hidden`}>
          <TouchableOpacity 
            style={[
              s`px-3 py-1`, 
              periodFilter === 'weekly' && s`bg-indigo-700`
            ]}
            onPress={() => setPeriodFilter('weekly')}>
            <Text style={[
              s`text-sm`, 
              periodFilter === 'weekly' ? s`text-white` : s`text-gray-600`
            ]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              s`px-3 py-1`, 
              periodFilter === 'monthly' && s`bg-indigo-700`
            ]}
            onPress={() => setPeriodFilter('monthly')}>
            <Text style={[
              s`text-sm`, 
              periodFilter === 'monthly' ? s`text-white` : s`text-gray-600`
            ]}>Monthly</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={dashboardData.salesData[periodFilter]}
        width={screenWidth - 48}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={s`rounded-lg`}
      />
      <View style={s`flex-row justify-between mt-4 px-2`}>
        <View>
          <Text style={s`text-gray-500 text-sm`}>Pending Payment</Text>
          <Text style={s`text-gray-800 font-bold text-base`}>{dashboardData.pendingPayments}</Text>
        </View>
        <View>
          <Text style={s`text-gray-500 text-sm`}>Pending Orders</Text>
          <Text style={s`text-gray-800 font-bold text-base`}>{dashboardData.pendingOrders}</Text>
        </View>
        <View>
          <Text style={s`text-gray-500 text-sm`}>Cancelled</Text>
          <Text style={s`text-gray-800 font-bold text-base`}>{dashboardData.cancelledOrders}</Text>
        </View>
      </View>
    </View>
  );

  const renderTopSellingItems = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <Text style={s`text-lg font-bold mb-3 text-gray-800`}>Top Selling Items</Text>
      {dashboardData.topSellingItems.map((item, index) => (
        <View key={index} style={s`flex-row items-center py-3 ${index !== dashboardData.topSellingItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <Image 
            source={{ uri: item.image }}
            style={s`w-14 h-14 rounded-lg mr-3`}
            resizeMode="cover"
          />
          <View style={s`flex-1`}>
            <Text style={s`font-medium text-gray-800`}>{item.name}</Text>
            <Text style={s`text-sm text-gray-500`}>{item.sold} sold</Text>
          </View>
          <View style={s`items-end`}>
            <Text style={s`font-bold text-gray-800`}>{item.revenue}</Text>
            <View style={s`flex-row items-center`}>
              <AntIcon name="arrowup" size={12} color="#16a34a" />
              <Text style={s`text-xs text-green-600 ml-1`}>4.2%</Text>
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity style={s`flex-row justify-center items-center mt-3 py-2`}>
        <Text style={s`text-indigo-700 font-medium mr-1`}>View All Products</Text>
        <AntIcon name="right" size={14} color="#4f46e5" />
      </TouchableOpacity>
    </View>
  );

  const renderRecentOrders = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <View style={s`flex-row justify-between items-center mb-3`}>
        <Text style={s`text-lg font-bold text-gray-800`}>Recent Orders</Text>
        <TouchableOpacity>
          <Text style={s`text-indigo-700 font-medium`}>See All</Text>
        </TouchableOpacity>
      </View>
      {dashboardData.recentOrders.map((order, index) => (
        <TouchableOpacity key={index} style={s`flex-row items-center justify-between py-3 ${index !== dashboardData.recentOrders.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <View>
            <Text style={s`font-medium text-gray-800`}>{order.id}</Text>
            <Text style={s`text-sm text-gray-500`}>{order.customer} • {order.items} items</Text>
          </View>
          <View style={s`items-end`}>
            <Text style={s`font-bold text-gray-800`}>{order.total}</Text>
            <View style={s`flex-row items-center`}>
              <View style={[
                s`h-2 w-2 rounded-full mr-1`,
                order.status === 'Completed' ? s`bg-green-500` : 
                order.status === 'In Transit' ? s`bg-blue-500` : s`bg-yellow-500`
              ]} />
              <Text style={s`text-xs text-gray-500`}>{order.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRiderRequests = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <View style={s`flex-row justify-between items-center mb-3`}>
        <Text style={s`text-lg font-bold text-gray-800`}>Rider Requests</Text>
        <View style={s`bg-red-100 rounded-full px-3 py-1`}>
          <Text style={s`text-red-700 text-sm font-medium`}>{dashboardData.riderRequests} New</Text>
        </View>
      </View>
      {dashboardData.riderRequestsList.slice(0, 3).map((request, index) => (
        <View key={index} style={s`flex-row items-center justify-between py-3 ${index !== 2 ? 'border-b border-gray-100' : ''}`}>
          <View style={s`flex-row items-center`}>
            <View style={s`w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3`}>
              <Icon name="bike" size={20} color="#4f46e5" />
            </View>
            <View>
              <Text style={s`font-medium text-gray-800`}>{request.rider}</Text>
              <Text style={s`text-sm text-gray-500`}>{request.orderId} • {request.distance}</Text>
            </View>
          </View>
          <View style={s`flex-row`}>
            {request.status === 'Pending' ? (
              <>
                <TouchableOpacity style={s`w-9 h-9 bg-green-100 rounded-full items-center justify-center mr-2`}>
                  <AntIcon name="check" size={16} color="#16a34a" />
                </TouchableOpacity>
                <TouchableOpacity style={s`w-9 h-9 bg-red-100 rounded-full items-center justify-center`}>
                  <AntIcon name="close" size={16} color="#dc2626" />
                </TouchableOpacity>
              </>
            ) : (
              <View style={[
                s`px-3 py-1 rounded-full`,
                request.status === 'Accepted' ? s`bg-blue-100` : s`bg-green-100`
              ]}>
                <Text style={[
                  s`text-xs font-medium`,
                  request.status === 'Accepted' ? s`text-blue-700` : s`text-green-700`
                ]}>{request.status}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
      <TouchableOpacity style={s`flex-row justify-center items-center mt-3 py-2`}>
        <Text style={s`text-indigo-700 font-medium mr-1`}>View All Requests</Text>
        <AntIcon name="right" size={14} color="#4f46e5" />
      </TouchableOpacity>
    </View>
  );

  const renderReviews = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <View style={s`flex-row justify-between items-center mb-3`}>
        <Text style={s`text-lg font-bold text-gray-800`}>Recent Reviews</Text>
        <TouchableOpacity>
          <Text style={s`text-indigo-700 font-medium`}>All Reviews</Text>
        </TouchableOpacity>
      </View>
      {dashboardData.recentReviews.map((review, index) => (
        <View key={index} style={s`py-3 ${index !== dashboardData.recentReviews.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <View style={s`flex-row justify-between`}>
            <Text style={s`font-medium text-gray-800`}>{review.customer}</Text>
            <Text style={s`text-sm text-gray-500`}>{review.time}</Text>
          </View>
          <View style={s`flex-row my-1`}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome 
                key={i} 
                name={i < review.rating ? "star" : "star-o"} 
                size={14} 
                color={i < review.rating ? "#eab308" : "#d1d5db"} 
                style={s`mr-1`}
              />
            ))}
          </View>
          <Text style={s`text-gray-600`}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );

  const renderCategoryPerformance = () => (
    <View style={s`mx-4 mb-6 bg-white rounded-xl shadow-md p-4`}>
      <Text style={s`text-lg font-bold mb-3 text-gray-800`}>Category Performance</Text>
      <View style={s`items-center`}>
        <BarChart
          data={dashboardData.categoryPerformance}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.6,
          }}
          verticalLabelRotation={0}
          fromZero
          style={s`rounded-lg`}
        />
      </View>
      <View style={s`flex-row flex-wrap mt-3`}>
        {['Pasta', 'Pizza', 'Dessert', 'Drinks'].map((category, index) => (
          <View key={index} style={s`flex-row items-center mr-4 mt-2`}>
            <View style={[
              s`w-3 h-3 rounded-full mr-1`,
              index === 0 ? s`bg-indigo-700` : 
              index === 1 ? s`bg-orange-500` : 
              index === 2 ? s`bg-sky-500` : s`bg-yellow-500`
            ]} />
            <Text style={s`text-sm text-gray-600`}>{category}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBottomTabBar = () => {
    const tabs = [
      { key: 'dashboard', icon: 'view-dashboard-outline', label: 'Dashboard' },
      { key: 'orders', icon: 'clipboard-list-outline', label: 'Orders' },
      { key: 'products', icon: 'food-outline', label: 'Products' },
      { key: 'payments', icon: 'cash-multiple', label: 'Payments' },
      { key: 'profile', icon: 'account-outline', label: 'Profile' }
    ];
    
    return (
      <View style={s`flex-row bg-white border-t border-gray-200 px-2`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={s`flex-1 items-center py-3`}
            onPress={() => setActiveTab(tab.key)}>
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.key ? '#4f46e5' : '#9ca3af'}
            />
            <Text style={[
              s`text-xs mt-1`,
              activeTab === tab.key ? s`text-indigo-700 font-medium` : s`text-gray-500`
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={s`flex-1 bg-gray-50 justify-center items-center`}>
        <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={s`mt-4 text-gray-600 font-medium`}>Loading dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s`flex-1 bg-gray-50`}>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderQuickStats()}
        {renderSalesChart()}
        {renderTopSellingItems()}
        {renderRecentOrders()}
        {renderRiderRequests()}
        {renderReviews()}
        {renderCategoryPerformance()}
        <View style={s`h-6`} />
      </ScrollView>
      {renderBottomTabBar()}
    </SafeAreaView>
  );
};

export default ProfessionalDashboardScreen;