import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Typography from './Core/Typography';
import Button from './Core/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ISuccessModalProps {
  title: string;
  message: string;
  button?: {
    title: string;
    onPress: () => void;
  };
  customButton?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  style?: ViewStyle;
  showClose?: boolean;
  children?: React.ReactNode;
  showImage?: boolean;
  align?: 'top' | 'center' | 'bottom' | 'bottom-center';
}

const SuccessModal = (props: ISuccessModalProps) => {
  const {
    title,
    message,
    children,
    button,
    visible,
    onClose,
    style,
    showClose,
    customButton,
    showImage = true,
    align = 'center',
  } = props;

  const getStyle = () => {
    if (align === 'top') {
      return {
        ...styles.modalView,
        ...styles.topStyles,
      };
    } else if (align === 'bottom') {
      return {
        ...styles.modalView,
        ...styles.bottomStyles,
      };
    } else if (align === 'bottom-center') {
      return {
        ...styles.modalView,
        ...styles.bottomCenter,
      };
    } else {
      return styles.modalView;
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            flex: 1,
          }}
        >
          <View style={[getStyle(), style]}>
            {showImage && (
              <FastImage
                source={require('')}
                style={{ width: 160, height: 160, marginVertical: 'auto' }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}

            {showClose && (
              <TouchableOpacity
                onPress={props.onClose}
                activeOpacity={0.8}
                style={{
                  padding: 6,
                  backgroundColor: '#EBEBEB',
                  borderRadius: 100,
                  position: 'absolute',
                  top: 16,
                  right: 24,
                }}
              >
                <AntDesign name="close" size={18} />
              </TouchableOpacity>
            )}
            {children ? (
              children
            ) : (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}
              >
                <Typography
                  color="Tertiary"
                  containerStyle={{ width: '90%' }}
                  style={{
                    fontFamily: 'Georgia',
                    fontSize: 24,
                    textAlign: 'center',
                    lineHeight: 32,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  containerStyle={{ width: '90%' }}
                  style={{
                    fontSize: 13,
                    opacity: 0.5,
                    fontWeight: '500',
                    marginTop: 6,
                    lineHeight: 20,
                    textAlign: 'center',
                  }}
                >
                  {message}
                </Typography>
                {button?.onPress && (
                  <Button
                    variant="royal"
                    style={{ width: widthPercentageToDP('70%'), marginTop: 20 }}
                    onPress={button.onPress}
                  >
                    {button.title}
                  </Button>
                )}
                {customButton && (
                  <View
                    style={{ width: widthPercentageToDP('80%') }}
                  >
                    {customButton}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: widthPercentageToDP('84%'),
    height: 'auto',
    maxHeight: heightPercentageToDP('70%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topStyles: {
    margin: 0,
    marginBottom: 'auto',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: '100%',
  },
  bottomStyles: {
    margin: 0,
    marginTop: 'auto',
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottomCenter: {
    margin: 'auto',
    marginTop: 'auto',
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
