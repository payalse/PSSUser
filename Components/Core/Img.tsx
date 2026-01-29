import {
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Svg, {SvgProps} from 'react-native-svg'; // For local SVGs

interface ImgProps extends ImageProps {
  source: any;
  onPress?: () => void;
  activeOpacity?: number;
  variant?: 'rounded' | 'circle' | 'thumbnail' | 'none';
  type?: 'svg' | 'image';
  disabled?: boolean;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  svgProps?: SvgProps;
}

const Img = (props: ImgProps) => {
  const {
    source,
    onPress,
    activeOpacity,
    variant = 'none',
    type = 'image',
    disabled,
    style,
    containerStyle,
    svgProps,
  } = props;
  const linkRegex =
    /\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|]/i;

  const isValidLink = () => {
    return linkRegex.test(source);
  };

  const checkSource = () => {
    if (type === 'image' && source && isValidLink()) {
      return {uri: source};
    }
    return source;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'rounded':
        return {borderRadius: 10};
      case 'circle':
        return {borderRadius: 50};
      case 'thumbnail':
        return {borderRadius: 5};
      case 'none':
        return {borderRadius: 0};
      default:
        return {borderRadius: 0};
    }
  };

  const renderImage = () => {
    if (type === 'svg' && typeof source === 'function') {
      const SvgComponent = source;
      return (
        <View style={[style, getVariantStyles()]}>
          <SvgComponent
            width={style?.width || 24}
            height={style?.height || 24}
            {...svgProps}
          />
        </View>
      );
    }

    return <Image source={checkSource()} style={[style, getVariantStyles()]} />;
  };

  const getActiveOpacity = () => {
    if (activeOpacity) {
      return activeOpacity;
    } else {
      if (onPress !== undefined) {
        return 0.8;
      } else {
        return 1;
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={getActiveOpacity()}
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}>
      {renderImage()}
    </TouchableOpacity>
  );
};

export default Img;

const styles = StyleSheet.create({});
