import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
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
        console.log(response);
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
    return <EmployeeItem item={item} />;
  };

  return (
    <View style={{...styles.container, paddingBottom: insets.bottom}}>
      <FlatList
        data={employeeData}
        renderItem={renderEmployeeItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
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
});
