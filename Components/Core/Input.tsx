import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useRef, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Typography from './Typography';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

interface ITextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
  style?: ViewStyle;
  value?: string;
  error?: string | null;
  type?: 'text' | 'date' | 'select' | 'time';
  options?: any;
  icon?: any;
  iconSide?: 'left' | 'right';
  hasError?: boolean;
  onChangeText?: (text: string) => void;
}

const customSelectIcon = () => {
  return (
    <TouchableOpacity style={{ position: 'absolute', right: 0, top: '80%' }}>
      <FontAwesome name="angle-down" size={24} />
    </TouchableOpacity>
  );
};
const Input = (props: ITextInputProps) => {
  const {
    children,
    containerStyle,
    label,
    labelStyle,
    style,
    value,
    onChangeText,
    type = 'text',
    iconSide = 'right',
    icon,
    error,
    hasError = false,
    ...inputsProps
  } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [openPicker, setopenPicker] = useState<boolean>(false);
  const selectRef: any = useRef();

  const getInputType = () => {
    switch (type) {
      case 'select':
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              selectRef?.current?.togglePicker();
            }}
            style={[
              styles.inputStyle,
              !value ? { opacity: 0.8 } : null,
              {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                position: 'relative',
              },
              style,
            ]}
          >
            <RNPickerSelect
              placeholder={{
                label: props.placeholder,
                value: null,
                color: '#9EA0A4',
              }}
              ref={selectRef}
              items={inputsProps?.options}
              itemKey={value}
              value={value}
              onValueChange={value => {
                if (onChangeText) onChangeText(value);
              }}
              // Icon={customSelectIcon}
              style={{
                viewContainer: {
                  width: '108%',
                  height: '100%',
                
                },
                inputIOS: {
                  color: '#636363',
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '100%',
                },
                inputAndroid: {
                  color: '#636363',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: -12,
                  marginLeft: -20,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              }}
            />
            <Image
              source={require('@assets/Images/Icons/drop-down.png')}
              style={{
                width: 15,
                height: 8,
                position: 'absolute',
                right: 20,
                top: 22,
                zIndex: 4
              }}
            />
          </TouchableOpacity>
        );
      // return (
      //   <View
      //     style={[
      //       styles.inputStyle,
      //       style,
      //       {
      //         display: 'flex',
      //         flexDirection: 'row',
      //         justifyContent: 'space-between',
      //         alignItems: 'center',
      //         backgroundColor: '#fff',
      //       },
      //     ]}
      //   >
      //     <FontAwesome name="search" size={20} style={{ marginRight: 10 }} />

      //     <TextInput
      //       onFocus={() => setIsHovered(true)}
      //       onBlur={() => setIsHovered(false)}
      //       onChangeText={onChangeText}
      //       value={value}
      //       placeholderTextColor="#b0aeb3"
      //       style={[{ width: '90%' }, style]}
      //       {...inputsProps}
      //     />
      //   </View>
      // );
      case 'date':
        return (
          <View
            style={[
              styles.inputStyle,
              !value ? { opacity: 0.8 } : null,
              isHovered ? { borderColor: '#e1e1e1' } : null,
              style,
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              onPress={() => setopenPicker(true)}
            >
              <Typography
                onPress={() => setopenPicker(true)}
                style={{
                  position: 'absolute',
                  left: 3,
                  top: 5,
                  fontSize: 16,
                  opacity: !value ? 0.6 : 1,
                  color: '#636363',
                }}
              >
                {value ? moment(value).format('DD-MM-YYYY') : props.placeholder}
              </Typography>
              <AntDesign
                name="calendar"
                size={20}
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  opacity: !value ? 0.6 : 1,
                }}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={openPicker}
              date={new Date()}
              onConfirm={date => {
                setopenPicker(false);
                if (onChangeText)
                  onChangeText(moment(date).format('YYYY-MM-DDTHH:mm:ssZ'));
              }}
              onCancel={() => {
                setopenPicker(false);
              }}
            />
          </View>
        );
      case 'time':
        return (
          <View
            style={[
              styles.inputStyle,
              !value ? { opacity: 0.8 } : null,
              isHovered ? { borderColor: '#e1e1e1' } : null,
              style,
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                console.log('pressed');
                setopenPicker(true);
              }}
            >
              <Typography
                onPress={() => setopenPicker(true)}
                style={{
                  position: 'absolute',
                  left: 3,
                  top: 5,
                  fontSize: 16,
                  opacity: !value ? 0.6 : 1,
                  color: '#636363',
                }}
              >
                {value ? value : props.placeholder}
              </Typography>
              <AntDesign
                name="clockcircleo"
                size={20}
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  opacity: !value ? 0.6 : 1,
                }}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="time"
              open={openPicker}
              date={new Date()}
              onConfirm={date => {
                setopenPicker(false);
                if (onChangeText) onChangeText(moment(date).format('HH:mm'));
              }}
              onCancel={() => {
                setopenPicker(false);
              }}
            />
          </View>
        );
      default:
        return (
          <TextInput
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor="#b0aeb3"
            style={[
              style,
              styles.inputStyle,
              props.multiline && styles.multilineInputStyle,
              iconSide === 'left' && { paddingLeft: 26 },
              isHovered && {
                borderColor: '#e1e1e1',
              },
            ]}
            {...inputsProps}
          />
        );
    }
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          error === null && {
            borderColor: 'red',
            borderWidth: 1,
          },
          containerStyle,
        ]}
      >
        {label && (
          <Typography style={[styles.inputLabel, labelStyle ? labelStyle : {}]}>
            {label}
          </Typography>
        )}
        {getInputType()}
      </View>
      {hasError && error != null && (
        <Text style={{ color: 'red', fontSize: 12, margin: 6 }}>{error}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    fontSize: 16,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 6,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  hoveredStyle: {
    shadowColor: 'rgba(0.30, 0.30, 0.30, 0.30)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    padding: 8,
    height: 64,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 6,
    marginLeft: 6,
  },
  inputStyle: {
    width: '100%',
    height: 52,
    fontSize: 16,
    opacity: 0.8,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 12,
    color: 'black',
  },
  multilineInputStyle: {
    height: 100,
    textAlignVertical: 'top',
  },
});
