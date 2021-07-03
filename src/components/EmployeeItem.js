import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';

export const EmployeeItem = ({item}) => {
  return (
    <ListItem key={item.id} bottomDivider onPress={() => console.log('hii')}>
      <Avatar
        rounded
        size="large"
        source={{uri: item.profile_image}}
        icon={{name: 'user', type: 'feather', color: 'black'}}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        {item.company?.name ? (
          <ListItem.Subtitle>{item.company?.name}</ListItem.Subtitle>
        ) : null}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};
