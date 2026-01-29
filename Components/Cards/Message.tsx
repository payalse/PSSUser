import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//@ts-ignore
import { Messages } from '@project-types/index';
import Typography from '@components/Core/Typography';
//@ts-ignore
import { FontSize } from '@project-types/enum';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

interface IProps {
  _id: string;
  message: string;
  receiver: string;
  createdAt: string;
  sender: string;
  ticket: string;
  updatedAt: string;
  type: string;
}

const Message = (props: IProps) => {
  const authUser = useSelector((s: RootState) => s.auth);
  console.log(props.receiver, authUser?.user?.uid, 'message');

  return (
    <View
      style={[
        styles.container,
        props?.sender === authUser?.user?.uid
          ? styles.senderMessage
          : styles.receiverMessage,
      ]}
    >
      <Typography
        containerStyle={{ flexDirection: 'row' }}
        color={props?.sender == authUser?.user?.uid ? 'White' : 'Tertiary'}
        style={{
          fontSize: FontSize['base'],
          lineHeight: 20,
          flexWrap: 'wrap',
        }}
      >
        {props?.message}
      </Typography>
      <Typography
        color={props?.sender == authUser?.user?.uid ? 'White' : 'Tertiary'}
        style={{
          fontSize: FontSize['sm'],
          marginLeft: 'auto',
          opacity: 0.5,
          marginTop: 2,
        }}
      >
        {moment(props?.createdAt).format('hh:mm A')}
      </Typography>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 20,
    borderRadius: 16,
    padding: 14,
    maxWidth: '80%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  receiverMessage: {
    backgroundColor: '#e8e7e5',
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  senderMessage: {
    backgroundColor: '#3F1B5B',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
  },
});
