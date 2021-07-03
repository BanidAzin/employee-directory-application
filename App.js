import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Add router */}
        <View />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
