import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getData} from '../Helpers';
import {EmployeeItem} from '../components';

const EMPLOYEE_DATA_URL = 'https://www.mocky.io/v2/5d565297300000680030a986';

export const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [isLoading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    getData({url: EMPLOYEE_DATA_URL})
      .then(response => {
        setEmployeeData(response);
        setError('');
      })
      .catch(({errors}) => {
        setError(errors.message || 'Something went wrong!');
      })
      .finally(() => setLoading(false));
  };

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

  const renderEmployeeItem = ({item}) => {
    return (
      <EmployeeItem
        item={item}
        onPress={() => navigation.navigate('Details', {item})}
      />
    );
  };

  return (
    <>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.container,
          paddingBottom: error.length === 0 ? insets.bottom : 0,
        }}>
        <FlatList
          data={employeeData}
          renderItem={renderEmployeeItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      {error.length > 0 && (
        <View
          style={{
            ...styles.errorContainer,
            paddingBottom: insets.bottom,
          }}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorContainer: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    minHeight: 30,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
