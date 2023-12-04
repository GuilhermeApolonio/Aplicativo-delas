
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export function HistoryScreen({ navigation }) {
  const [rides, setRides] = useState([
    { id: 1, data: '20-05-2023', distance: '10 km', pay: '$20.00' },
    { id: 2, data: '03-10-2023', distance: '5 km', pay: '$12.50' },
    { id: 3, data: '13-08-2023', distance: '8 km', pay: '$15.00' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Histórico de corridas</Text>
        </View>
      

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideItem}>
            <Text style={styles.rideDate}>{item.data}</Text>
            <Text style={styles.rideInfo}>Distância: {item.distance}</Text>
            <Text style={styles.rideInfo}>Tarifa: {item.pay}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  rideItem: {
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 5,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  rideInfo: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    height: 100,
    backgroundColor: '#5E17EB',
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
   
  
    
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

