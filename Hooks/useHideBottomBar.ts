import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Platform, ViewStyle } from 'react-native';

const defaultTabBarStyle: ViewStyle = {
  height: Platform.OS === 'ios' ? 80 : 72,
  paddingTop: Platform.OS === 'ios' ? 25 : 14,
  backgroundColor: '#120B1C',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderTopRightRadius: 14,
  borderTopLeftRadius: 14,
};

export default function useHideBottomBar() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none', height: 0 },
      tabBarShowLabel: false,
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: defaultTabBarStyle,
        tabBarShowLabel: true,
      });
    };
  }, [navigation]);
}
