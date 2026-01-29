import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export enum Color {
  Primary = '#102A50',
  Secondary = '#686628',
  Tertiary = '#120B1C',
  Red = '#3F1B5B',
  White = '#FFFFFF',
}

export enum FontSize {
  xs = wp(2.5),
  sm = wp(3.2),
  base = wp(3.6),
  lg = wp(4),
  '1.5lg' = wp(4.3),
  xl = wp(5),
  '1.5xl' = wp(5.8),
  '2xl' = wp(7),
  '3xl' = wp(9),
  '4xl' = wp(11),
  '5xl' = wp(12.5),
  '6xl' = wp(14),
}
