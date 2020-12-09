import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Container, Form, H1, Input, Item} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
function Edit({navigation, route}) {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async () => {
    //
    try {
      if (!name || !totalNoSeason) {
        return alert('Please enter value in both field');
        //TODO:add snack bar
      }

      const seasonToAdd = {
        id,
        name,
        totalNoSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = JSON.parse(storedValue);

      list.map((singleSeason) => {
        if (singleSeason.id == id) {
          singleSeason.name = name;
          singleSeason.totalNoSeason = totalNoSeason;
        }
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(list));
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {season} = route.params;
    const {id, name, totalNoSeason} = season;
    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, []);

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
          <Button rounded block onPress={update}>
            <Text style={{color: '#eee', fontSize: 30}}>Update</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
}

export default Edit;

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
