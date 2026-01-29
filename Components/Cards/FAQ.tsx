import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Typography from '@components/Core/Typography';
// @ts-ignore
import { FontSize } from '@project-types/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FAQList } from '@project-types/index';

interface IProps {
  index: number;
  item: FAQList;
}

const FAQ = (props: IProps) => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <View
      style={{
        marginTop: props.index === 0 ? 12 : 8,
      }}
    >
      <TouchableOpacity
        onPress={() => setisOpen(!isOpen)}
        activeOpacity={0.4}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          onPress={() => setisOpen(!isOpen)}
          style={{
            fontWeight: 'bold',
            fontSize: FontSize['lg'],
          }}
        >
          {props.item.ques}
        </Typography>
        <AntDesign name={isOpen ? 'down' : 'right'} size={16} color="#000" />
      </TouchableOpacity>
      {isOpen && (
        <Typography
          style={{
            width: '90%',
            fontSize: FontSize['base'],
            opacity: 0.4,
            marginVertical: 2,
            lineHeight: 20,
          }}
        >
          {props.item.ans}
        </Typography>
      )}
      <View
        style={{
          height: 1,
          backgroundColor: '#000',
          opacity: 0.1,
          marginVertical: 12,
          width: '50%',
        }}
      />
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({});
