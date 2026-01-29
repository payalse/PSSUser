// import React from 'react';
// import {View, Text, ViewStyle, Platform} from 'react-native';
// import {
//   BottomTabBar,
//   createBottomTabNavigator,
// } from '@react-navigation/bottom-tabs';
// import HomeStack from './HomeStack';
// import ResourcesStack from './ResourcesStack';
// import CoursesStack from './CoursesStack';
// import CalendarStack from './CalendarStack';
// import Home from '../Assets/Images/Icons/Home.svg';
// import HomeFilled from '../Assets/Images/Icons/HomeFilled.svg';
// import ResourcesIcon from '../Assets/Images/Icons/Resources.svg';
// import ResourcesIconFilled from '../Assets/Images/Icons/ResourcesFilled.svg';
// import CoursesIcon from '../Assets/Images/Icons/Courses.svg';
// import CoursesIconFilled from '../Assets/Images/Icons/CoursesFilled.svg';
// import CalendarIcon from '../Assets/Images/Icons/Calendar.svg';
// import CalendarIconFilled from '../Assets/Images/Icons/CalendarFilled.svg';
// import Img from '@components/Core/Img';
// //@ts-ignore
// import { FontSize } from '@project-types/enum';
// import {useNavigation} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// export const tabBarStyle: ViewStyle = {
//   height: Platform.OS === 'ios' ? 80 : 72,
//   paddingTop: Platform.OS === 'ios' ? 25 : 14,
//   backgroundColor: '#120B1C',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   borderTopRightRadius: 14,
//   borderTopLeftRadius: 14,
// };

// const TabNavigation = () => {
//   const navigation = useNavigation<any>();
//   return (
//     <Tab.Navigator
//       tabBar={props => (
//         <View
//           style={{
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}>
//           <BottomTabBar {...props} />
//         </View>
//       )}
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: tabBarStyle,
//         unmountOnBlur: true,
//       }}>
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStack}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 opacity: focused ? 1 : 0.5,
//                 marginVertical: 'auto',
//                 alignSelf: 'center',
//               }}>
//               <Img
//                 type="svg"
//                 onPress={() => {
//                   navigation.navigate('HomeStack');
//                 }}
//                 source={focused ? HomeFilled : Home}
//                 style={{width: FontSize['1.5xl'], height: FontSize['1.5xl']}}
//               />
//               <Text
//                 style={{color: 'white', fontSize: FontSize.base, marginTop: 4}}>
//                 Home
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="ResourcesStack"
//         component={ResourcesStack}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             // Custom logic to clear parameters or state
//             navigation.navigate('ResourcesStack', { clearParams: true });
//           },
//         })}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 opacity: focused ? 1 : 0.5,
//                 marginVertical: 'auto',
//               }}>
//               <Img
//                 type="svg"
//                 source={focused ? ResourcesIconFilled : ResourcesIcon}
//                 style={{width: FontSize['1.5xl'], height: FontSize['1.5xl']}}
//               />
//               <Text
//                 style={{color: 'white', fontSize: FontSize.base, marginTop: 4}}>
//                 Resources
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CoursesStack"
//         component={CoursesStack}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             // Custom logic to clear parameters or state
//             navigation.navigate('CoursesStack', { clearParams: true });
//           },
//         })}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 opacity: focused ? 1 : 0.5,
//                 marginVertical: 'auto',
//               }}>
//               <Img
//                 type="svg"
//                 source={focused ? CoursesIconFilled : CoursesIcon}
//                 style={{width: FontSize['1.5xl'], height: FontSize['1.5xl']}}
//               />
//               <Text
//                 style={{color: 'white', fontSize: FontSize.base, marginTop: 4}}>
//                 Courses
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CalendarStack"
//         component={CalendarStack}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 opacity: focused ? 1 : 0.5,
//                 marginVertical: 'auto',
//               }}>
//               <Img
//                 type="svg"
//                 onPress={() => {
//                   navigation.navigate('CalendarStack');
//                 }}
//                 source={focused ? CalendarIconFilled : CalendarIcon}
//                 style={{width: FontSize['1.5xl'], height: FontSize['1.5xl']}}
//               />
//               <Text
//                 style={{color: 'white', fontSize: FontSize.base, marginTop: 4}}>
//                 Calendar
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigation;
