import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
//@ts-ignore
import { SupportTicketProps } from '@project-types/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Typography from '@components/Core/Typography';
//@ts-ignore
import { Color, FontSize } from '@project-types/enum';
import Button from '@components/Core/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  ticket: SupportTicketProps;
}

const Ticket = (props: IProps) => {
  const navigation = useNavigation<any>();
  const { ticket } = props;
  const { title, description, status, createdAt, report } = ticket;
  console.log(props, 'tikcet');
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TicketDetail', { ticket });
      }}
      activeOpacity={0.4}
      style={styles.container}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          onPress={() => {
            navigation.navigate('TicketDetail', { ticket });
          }}
        >
          {title}
        </Typography>
        {report && report.length ? (
          <Typography
            onPress={() => {
              navigation.navigate('TicketDetail', { ticket });
            }}
            style={{
              fontSize: FontSize['base'],
              color: '#BF5529',
            }}
          >
            Reported
          </Typography>
        ) : (
          <Typography
            onPress={() => {
              navigation.navigate('TicketDetail', { ticket });
            }}
            style={{
              fontSize: FontSize['base'],
              color: status === 0 || status === 1 ? Color.Primary : '#BF5529',
            }}
          >
            {(status === 0 && 'Open') ||
              (status === 1 && 'Open') ||
              (status === 2 && 'Closed')}
          </Typography>
        )}
      </View>
      <Button
        style={{
          height: 24,
          width: wp('28%'),
          marginVertical: 8,
        }}
        onlyText
        variant="red"
      >
        <MaterialCommunityIcons
          name="clock-time-four"
          size={18}
          color={Color.Tertiary}
        />
        <Typography
          style={{
            fontSize: FontSize['sm'],
            color: Color.Tertiary,
            marginLeft: 4,
          }}
        >
          {moment(createdAt).format('MM/DD/YYYY')}
        </Typography>
      </Button>

      <Typography
        auto
        onPress={() => {
          navigation.navigate('TicketDetail', { ticket });
        }}
        style={{
          fontSize: FontSize['base'],
          color: Color.Tertiary,
          opacity: 0.4,
          lineHeight: 16,
        }}
      >
        {description.length > 50
          ? description.slice(0, 50) + '...'
          : description}
      </Typography>
    </TouchableOpacity>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: hp('16%'),
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 'auto',
    // justifyContent: 'space-between',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 18,
  },
});
