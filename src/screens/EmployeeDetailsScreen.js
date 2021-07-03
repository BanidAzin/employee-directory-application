/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-elements';

export const EmployeeDetailsScreen = ({route}) => {
  const {item} = route.params;
  return (
    <View>
      <Card containerStyle={styles.card}>
        <View style={styles.mainDetailsContainer}>
          <Avatar
            rounded
            size="large"
            source={{uri: item.profile_image}}
            icon={{name: 'user', type: 'feather', color: 'black'}}
          />
          <View style={styles.textDetailsContainer}>
            {item.username && (
              <Text style={{...styles.headerTextStyle, textAlign: 'center'}}>
                {item.username}
              </Text>
            )}
            {item.email && (
              <Text style={{...styles.bodyText, textAlign: 'center'}}>
                {item.email}
              </Text>
            )}
            {item.phone && (
              <Text style={{...styles.bodyText, textAlign: 'center'}}>
                {item.phone}
              </Text>
            )}
            {item.website && (
              <Text style={{...styles.bodyText, textAlign: 'center'}}>
                {item.website}
              </Text>
            )}
          </View>
        </View>

        {item.address && (
          <View style={styles.textDetailsContainer}>
            <Text
              style={{
                ...styles.headerTextStyle,
                textDecorationLine: 'underline',
                paddingVertical: '2%',
              }}>
              Address:
            </Text>
            {Object.keys(item.address).map(key => {
              if (key === 'geo') return;
              return (
                <Text key={key} style={styles.bodyText}>
                  {item.address[key]}
                </Text>
              );
            })}
          </View>
        )}

        {item.company && (
          <View style={styles.textDetailsContainer}>
            <Text
              style={{
                ...styles.headerTextStyle,
                textDecorationLine: 'underline',
                paddingVertical: '2%',
              }}>
              Company:
            </Text>
            {Object.keys(item.company).map(key => {
              return (
                <Text key={key} style={styles.bodyText}>
                  {item.company[key]}
                </Text>
              );
            })}
          </View>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  mainDetailsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textDetailsContainer: {
    marginVertical: '3%',
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 18,
    paddingVertical: '1%',
  },
});
