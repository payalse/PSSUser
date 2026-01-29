import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Typography from '@components/Core/Typography';
import Img from '@components/Core/Img';
//@ts-ignore
import { FontSize } from '@project-types/enum';
// import HomeFilled from '../Assets/Images/Icons/HomeFilled.svg';
// import Home from '../Assets/Images/Icons/Home.png';
// import ResourcesIcon from '../Assets/Images/Icons/Resources.svg';
// import ResourcesIconFilled from '../Assets/Images/Icons/ResourcesFilled.svg';
// import CoursesIcon from '../Assets/Images/Icons/Courses.svg';
// import CoursesIconFilled from '../Assets/Images/Icons/CoursesFilled.svg';
// import CalendarIcon from '../Assets/Images/Icons/Calendar.svg';
// import CalendarIconFilled from '../Assets/Images/Icons/CalendarFilled.svg';

const BottomTab = (props: any) => {
  const TABS = [
    {
      name: 'Home',
      filled: '',
      outlined: '',
      route: 'HomeStack',
    },
    {
      name: 'Resources',
      filled: '',
      outlined: '',
      route: 'ResourcesStack',
    },
    {
      name: 'Courses',
      filled: '',
      outlined: '',
      route: 'CoursesStack',
    },
    {
      name: 'Calendar',
      filled: '',
      outlined: '',
      route: 'CalendarStack',
    },
  ];

  const focusedRoute = props.state.routes[props.state.index];

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: focusedRoute.name === tab.route ? 1 : 0.5,
          }}
          onPress={() => props.navigation.navigate(tab.route)}
          key={index}>
          <Img
            onPress={() => props.navigation.navigate(tab.route)}
            type="svg"
            source={tab.route === focusedRoute.name ? tab.filled : tab.outlined}
            style={{width: FontSize['1.5xl'], height: FontSize['1.5xl']}}
          />
          <Typography
            variant="body"
            style={{color: 'white', fontSize: FontSize.base, marginTop: 4}}>
            {tab.name}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#120B1C',
    height: 72,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
});
