import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchBar} from 'react-native-elements';
import Realm from 'realm';

import {getData} from '../Helpers';
import {EmployeeItem} from '../components';
import {EMPLOYEE_SCHEMA, EmployeeSchema} from '../data/schema';

const EMPLOYEE_DATA_URL = 'https://www.mocky.io/v2/5d565297300000680030a986';

const databaseOptions = {
  path: 'realmT4.realm',
  schema: [EmployeeSchema],
  schemaVersion: 0,
};

export const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [didMount, setDidMount] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [employeeFullData, setEmployeeFullData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => setDidMount(true), []);

  useEffect(() => {
    Realm.open(databaseOptions).then(realm => {
      const localData = realm.objects(EMPLOYEE_SCHEMA);
      if (localData.length > 0) {
        const tempData = localData.map(key => JSON.parse(key.value));
        setEmployeeFullData(tempData[0]);
        setEmployeeData(tempData[0]);
        setLoading(false);
      } else {
        fetchEmployeeData();
      }
    });
  }, []);

  useEffect(() => {
    if (didMount) {
      const data = filterEmployeeDataBySearchtext(employeeFullData);
      const handler = setTimeout(() => {
        setEmployeeData(data);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const filterEmployeeDataBySearchtext = data => {
    return data.filter(
      key =>
        key.name.toUpperCase().includes(searchText.toUpperCase()) ||
        key.email.toUpperCase().includes(searchText.toUpperCase()),
    );
  };

  const fetchEmployeeData = () => {
    getData({url: EMPLOYEE_DATA_URL})
      .then(response => {
        setSearchText('');
        setEmployeeFullData(response);
        setEmployeeData(response);
        setError('');
        Realm.open(databaseOptions).then(realm => {
          realm.write(() => {
            realm.create(EMPLOYEE_SCHEMA, {
              id: response[0]?.id,
              value: JSON.stringify(response),
            });
          });
        });
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

  const onSearchTextChange = text => setSearchText(text);

  const listHeaderComponent = () => {
    return (
      <SearchBar
        placeholder="search here..."
        onChangeText={onSearchTextChange}
        value={searchText}
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
        {listHeaderComponent()}
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
