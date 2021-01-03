import React from 'react';
import { SafeAreaView, View, Text, FlatList,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const Favorites = (props) => {
    const favList = useSelector(state => state.favoriteList);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
                <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    data={favList}
                    
                    renderItem={({ item }) => <Text style={styles.text}><Icon name={"heart"} size={20} color={"red"} /> {item.name}</Text>}
                    ListEmptyComponent={() => <Text style={styles.text}>Nothing on fav...</Text>}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    
                />
            </View>
        </SafeAreaView>
    );
}

export { Favorites };

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
    text: { 
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        fontWeight: '200'
  },
    seperator: {
        marginTop: 10, 
        marginBottom:10,
        borderWidth: 0.5, 
        borderColor: 'orange',
    }
  });