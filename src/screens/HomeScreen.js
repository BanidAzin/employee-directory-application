import React from 'react';
import {View, Text, Button} from 'react-native';

export const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};
