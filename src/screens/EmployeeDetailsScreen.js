import React from 'react';
import {View, Text} from 'react-native';

export const EmployeeDetailsScreen = ({route}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
