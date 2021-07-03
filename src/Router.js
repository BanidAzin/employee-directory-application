import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoadingScreen, HomeScreen, EmployeeDetailsScreen} from './screens';

const Stack = createStackNavigator();

export const Router = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={EmployeeDetailsScreen} />
    </Stack.Navigator>
  );
};
