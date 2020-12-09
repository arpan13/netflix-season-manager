import {Button, Container, Form, H1, Input, Item} from 'native-base';
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import shortid from 'shortid';
import {ScrollView} from 'react-native-gesture-handler';
function Add({navigation, route}) {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert('Please Add both fields');
      }
      const seasonToAdd = {
        id: shortid.generate(),
        name: name,
        totalNoSeason: totalNoSeason,
        isWatched: false,
      };
      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);
      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 style={styles.heading}>Add to Watch List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Season Name"
              style={{color: '#eee'}}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              value={totalNoSeason}
              onChangeText={(text) => setTotalNoSeason(text)}
              placeholder="Total No of Seasons"
              style={{color: '#eee'}}
            />
          </Item>
          <Button rounded block onPress={addToList}>
            <Text style={{color: '#eee', fontSize: 30}}>Add</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
}

export default Add;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});
