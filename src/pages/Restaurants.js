import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {RAPIDAPI_KEY} from '../../storeage';

import { RestaurantItem } from '../components'

const Restaurants = (props) => {
    console.log(RAPIDAPI_KEY);
    const [list, setList] = useState([]);
    const dispatch = useDispatch();

    const fetchData = () => {
        axios.post(
            'https://worldwide-restaurants.p.rapidapi.com/search',
            {
                "limit": "30",
                "language": "en_US",
                "location_id": "297704",
                "currency": "USD"
            },
            {
                headers: {
                    "content-type": "application/json",
                    "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
                    "x-rapidapi-key": RAPIDAPI_KEY,
                }
            }
        )
            .then(response => setList(response.data.results.data))
            .catch(error => console.log(error))
    }

    useEffect(() => fetchData(), []);

    const renderList = ({ item }) => {
        return (
            <RestaurantItem
                item={item}
                onAddFavorite={() => dispatch({
                    type: "ADD_TO_FAVORITE",
                    payload: { selectedRestaurant: item }
                })}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Restaurants</Text>
                <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    data={list}
                    renderItem={renderList}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                />
            </View>
        </SafeAreaView>
    )
}

export { Restaurants }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'orange',
    backgroundColor: 'black'
  },
  title: { 
        fontSize: 25, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: 'orange'
  },
  seperator: {
      borderWidth: 0.5, 
      borderColor: 'orange',
  }
});

