import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Axios from 'axios';
import moment from 'moment';

export function HistoryScreen({ navigation }) {
  const [corridasFinalizadas, setCorridasFinalizadas] = useState([]);

  useEffect(() => {
    Axios.get("http://192.168.0.43:3001/corridas/finalizadas")
      .then((response) => {
        setCorridasFinalizadas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar corridas finalizadas:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Histórico de corridas</Text>
      </View>

      <FlatList
        data={corridasFinalizadas}
        keyExtractor={(item) => item.Id_Corrida.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideItem}>
            <Text style={styles.rideDate}>
              Data: {moment(item.Horario).format('DD/MM/YYYY HH:mm')}
            </Text>
            <Text style={styles.rideInfo}>Origem: {item.Origem}</Text>
            <Text style={styles.rideInfo}>Destino: {item.Destino}</Text>
            <Text style={styles.rideInfo}>Distância: {item.Distancia} km</Text>
            <Text style={styles.rideInfo}>Valor: R$ {item.Valor}</Text>
            {/* Adicione mais informações conforme necessário */}
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

