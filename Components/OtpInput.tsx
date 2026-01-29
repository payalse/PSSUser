import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import CustomNumericKeyboard from './CustomNumericKeyboard';
//@ts-ignore
import { Color } from '@project-types/enum';
import Typography from './Core/Typography';

interface OTPInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  onChangeText: (text: string, index: number) => void;
  value: string[];
  error?: string | undefined;
  onPress: any;
}

const OTPInput: React.FC<OTPInputProps> = ({
  onChangeText,
  value,
  style,
  error,
  onPress,
  ...inputsProps
}) => {
  const [isHovered, setIsHovered] = useState<any>(null);
  const inputRefs = useRef<TextInput[]>(Array(4).fill(null));
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const resendOTPStartTimmer = () => {
    setMinutes(0);
    setSeconds(59);
    onPress()
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (text: string, index: number) => {
    onChangeText(text, index);
    if (text.length === 1) {
      focusNextInput(index);
    } else if (text.length === 0) {
      focusPrevInput(index);
    }
  };

  const handleCustomKeyboardInput = (key: string) => {
    console.log(key, 'key', activeInputIndex, 'activeInputIndex');
    if (activeInputIndex !== null) {
      if (key === 'backspace') {
        handleInputChange('', activeInputIndex);
        if (activeInputIndex > 0) {
          setActiveInputIndex(activeInputIndex - 1);
          inputRefs.current[activeInputIndex - 1]?.focus();
        }
      } else {
        handleInputChange(key, activeInputIndex);
        if (activeInputIndex < 3) {
          setActiveInputIndex(activeInputIndex + 1);
          inputRefs.current[activeInputIndex + 1]?.focus();
        }
      }
    }
  };
  return (
    <View
      style={[
        styles.container,
        error ? { borderColor: 'red', borderWidth: 1 } : null,
        style,
      ]}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2, 3].map(index => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref as TextInput)}
            value={value[index]}
            onChangeText={text => handleInputChange(text, index)}
            style={[
              styles.inputStyle,
              !value[index]
                ? { opacity: 0.8 }
                : {
                    backgroundColor: Color.Secondary,
                    color: '#fff',
                    fontSize: 20,
                  },
              {
                borderColor:
                  isHovered === index
                    ? Color.Secondary
                    : value[index]
                    ? Color.Secondary
                    : '#222',
              },
            ]}
            showSoftInputOnFocus={false}
            maxLength={1}
            {...inputsProps}
            onFocus={() => setIsHovered(index)}
            onBlur={() => setIsHovered(null)}
          />
        ))}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
          zIndex: 2,
          marginVertical: 16,
        }}
      >
        <Typography
          style={{
            opacity: 0.5,
            fontSize: 15,
          }}
        >
          Didn't Receive Code?
        </Typography>
        {seconds > 0 || minutes > 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', opacity: 0.4 }}>
            <Typography
              style={{ marginLeft: 6, fontWeight: 'bold', fontSize: 15 }}
            >
              Resend in {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          </View>
        ) : (
          <Typography
            style={{
              marginLeft: 6,
              fontWeight: 'bold',
              fontSize: 15,
            }}
            onPress={resendOTPStartTimmer}
          >
            Resend
          </Typography>
        )}
      </View>
      <CustomNumericKeyboard onKeyPress={handleCustomKeyboardInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    marginTop: 44,
  },
  inputStyle: {
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#222',
    width: '18%',
    fontSize: 18,
    height: 48,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});

export default OTPInput;
