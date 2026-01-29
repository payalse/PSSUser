import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';
//@ts-ignore
import { Color } from '@project-types/enum';
import * as Animatable from 'react-native-animatable';
//@ts-ignore
import { EnumColors, TextVariant } from '@project-types/index';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: TextStyle | TextStyle[];
  containerStyle?: TouchableOpacityProps['style'] | ViewStyle;
  disabled?: boolean;
  variant?: TextVariant;
  color?: EnumColors;
  activeOpacity?: number;
  parentCenter?: boolean;
  auto?: boolean;
  animationProps?: Animatable.AnimatableProps<any>;
}

const Typography = (props: TypographyProps) => {
  const {
    children,
    onPress,
    style,
    activeOpacity,
    containerStyle,
    variant = 'body',
    color = 'Tertiary',
    parentCenter = false,
    disabled,
    animationProps,
    auto,
  } = props;
  const containerRef = useRef<any>(null);

  const getVariantStyle = () => {
    const variantStyles = {
      heading: styles.heading,
      subheading: styles.subheading,
      body: styles.body,
      caption: styles.caption,
      link: styles.link,
      backgroundFill: styles.backgroundFill,
      royal: {
        fontSize: 16,
        fontFamily: 'Georgia',
      },
    };

    const defaultColor =
      variant === 'body' || variant === 'caption' ? '#120B1C' : '#1E1E1E';

    return {
      ...(variantStyles[variant] || styles.body),
      color: color === 'Red' ? Color.Primary : Color[color] || defaultColor,
    };
  };

  const checkonPress = () => {
    if (onPress) {
      return onPress();
    }
  };

  const getActiveOpacity = () => {
    if (onPress) {
      return activeOpacity || 0.5;
    }
    return 1;
  };

  const combinedStyle = [
    getVariantStyle(),
    {
      opacity: disabled ? 0.5 : 1,
      borderColor: variant === 'link' ? Color[color] : 'transparent',
    },
    style,
  ];

  const combinedContainerStyle = [
    parentCenter ? styles.container : {},
    variant === 'backgroundFill'
      ? {
          backgroundColor: Color.Red,
          borderRadius: 50,
          padding: 4,
          paddingHorizontal: 12,
        }
      : {},
    containerStyle,
  ];

  return (
    <Animatable.View animation={animationProps?.animation}>
      <TouchableOpacity
        ref={containerRef}
        style={[
          combinedContainerStyle,
          variant === 'backgroundFill' && { alignSelf: 'flex-start', padding: 0 },
          auto && { marginTop: 'auto', marginBottom: 'auto' },
        ]}
        activeOpacity={getActiveOpacity()}
        onPress={checkonPress}
      >
        <Text style={combinedStyle} onPress={checkonPress}>
          {children}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Typography;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
  },
  backgroundFill: {
    fontSize: 14,
    fontFamily: 'Rock Salt',
    fontWeight: 'normal',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Montserrat-Black',
  },
  link: {
    fontSize: 16,
    borderBottomWidth: 0.7,
  },
  caption: {
    fontSize: 12,
  },
});
