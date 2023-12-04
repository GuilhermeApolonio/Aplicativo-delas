import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'


export function CardScreen({navigation}) {
  const [numero, setNumero] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [pais, setPais] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');

  return (
    <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.headerText}>Adicionar cartão</Text>
          </View>
    <View style={styles.dados}>

    <TextInput
      style={styles.input}
      value={numero}
      onChangeText={setNumero}
      placeholder="Número do cartão"
      keyboardType="numeric"
    />


    <View style= {{ display: 'flex', flexDirection: 'row' }}>
    <TextInput
      style={styles.input1}
      value={validade}
      onChangeText={setValidade}
      placeholder="Validade (MM/AA)"
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input2}
      value={cvv}
      onChangeText={setCvv}
      placeholder="CVV"
      keyboardType="numeric"
    />
    </View>

    <TextInput
      style={styles.input}
      value={pais}
      onChangeText={setPais}
      placeholder="País"
    />
    <TextInput
      style={styles.input}
      value={nomeCartao}
      onChangeText={setNomeCartao}
      placeholder="Nome no cartão"
    />
    </View>
    <TouchableOpacity style={styles.cadButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cadButtonText}>Adicionar Cartão</Text>
      </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#5E17EB",
    marginBottom: 10,
    paddingHorizontal: 9,
    borderRadius: 15,
    
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
    paddingTop: 15
  
  },
  dados:{
    padding: 4
  },
  input1:{
    borderWidth: 1,
    borderColor: "#5E17EB",
    width: 200,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 9,
    flexDirection: 'row',
    padding: 7,
    
    
  },

  input2:{
    borderWidth: 1,
    borderColor: "#5E17EB",
    width: 200,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 9,
    flexDirection: 'row',
    left:4
  },

  cadButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  cadButton: {
    backgroundColor: '#5E17EB',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  
});