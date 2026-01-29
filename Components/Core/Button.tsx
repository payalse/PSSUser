import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import Typography from './Typography';
//@ts-ignore
import { Color } from '@project-types/enum';

interface IButtonProps extends TouchableOpacityProps {
  labelStyle?: TextStyle;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | TouchableOpacityProps['style'];
  variant?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'icon'
    | 'royal'
    | 'red';
  activeOpacity?: number;
  isLoading?: boolean;
  showIconShadow?: boolean;
  color?: string;
  onlyText?: boolean;
  onPress?: () => void;
}

const Button = (props: IButtonProps) => {
  const {
    children,
    style,
    labelStyle,
    activeOpacity = 0.8,
    variant = 'primary',
    isLoading = false,
    showIconShadow = true,
    onPress,
    onlyText = false,
    ...touchableOpacityProps
  } = props;

  const getButtonVariant = () => {
    switch (variant) {
      case 'royal':
        return [styles.container, {backgroundColor: Color.Secondary}];
      case 'primary':
        return [styles.container, {backgroundColor: Color.Red}];
      case 'secondary':
        return [styles.container, {backgroundColor: Color.Primary}];
      case 'transparent':
        return [styles.container, {backgroundColor: 'transparent'}];
      case 'red':
        return [styles.onlyText];
      case 'icon':
        return [
          styles.container,
          styles.iconStyle,
          showIconShadow && styles.iconShadow,
        ];
      default:
        return [styles.container, {backgroundColor: Color.Secondary}];
    }
  };

  return (
    <TouchableOpacity
      disabled={isLoading || props.disabled}
      activeOpacity={onlyText ? 1 : activeOpacity}
      onPress={onPress}
      style={[getButtonVariant(), isLoading && {opacity: 0.8}, style]}
      {...touchableOpacityProps}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : typeof children === 'string' ? (
        <>
        <Typography
          onPress={onPress}
          style={[
            styles.label,
            labelStyle ? labelStyle : {},
            variant === 'royal'
              ? {
                  fontFamily: 'Georgia',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }
              : {},
          ]}>
          {children}
        </Typography>
        {variant === 'primary' && (
        <Image
          source={require('@assets/Images/Icons/btn-icon.png')}
            style={{ width: 20, height: 20 }}
          />
        )}
        </>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: 50,
    marginVertical: 4,
    zIndex: 2,
    borderRadius: 12,
  },
  onlyText: {
    backgroundColor: Color.Red,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 38,
    width: 120,
  },

  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    backgroundColor: '#fff',
    padding: 0,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
});

export default Button;
