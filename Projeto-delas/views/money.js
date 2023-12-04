import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export function MoneyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dinheiro</Text>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="money-bill-wave" size={150} color="green" />
      </View>
      <Text style={styles.text}>Sua corrida será paga em dinheiro.</Text>
      <Text style={styles.text2}>O aparelho do motorista vai indicar o valor a ser pago ao final da viagem.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: '#5E17EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 180,
  },
  text:{
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#5E17EB'
  },
  text2:{
    marginHorizontal: 11,
    textAlign: 'center',
    fontSize: 15,
    color: 'black'
  
  },
});
