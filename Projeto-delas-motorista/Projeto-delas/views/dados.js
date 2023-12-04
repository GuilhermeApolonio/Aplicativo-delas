import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
//import axios from 'axios';

export function DadosScreen({ navigation }) {
  const [data, setDados] = useState(null);

 // const deletarItem = (cpf) => {
  //  axios
  //    .delete(`http://192.168.1.11:3001/cad/${cpf}/delete`)
  //    .then(() => {
  //      console.log('Conta excluída com sucesso');
        // Executar ações após a exclusão ser concluída
  //    })
    //  .catch((error) => {
   //     console.error('Erro ao excluir a conta:', error);
  //    });
 // };

  //useEffect(() => {
  //  axios
    //  .get('http://192.168.1.11:3001/cad')
    //  .then((response) => {
      //  const dados = response.data;
       // const ultimoDado = dados.find((item, index) => index === dados.length - 1);
    //    setDados(ultimoDado);
   //   })
    //  .catch((error) => {
    //    console.error('Erro ao obter os dados:', error);
   //   });
 // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dados pessoais</Text>
      </View>

      <View style={styles.header1}>
        <View style={styles.iconContainer}>
          <Fontisto name="female" size={50} color="white" style={styles.icon} />
        </View>
      </View>

      {data ? (
        <>
          <Text style={styles.title}>Nome:</Text>
          <Text style={styles.text}>{data.nome}</Text>

          <Text style={styles.title}>CPF:</Text>
          <Text style={styles.text}>{data.cpf}</Text>

          <Text style={styles.title}>Email:</Text>
          <Text style={styles.text}>{data.email}</Text>

          <TouchableOpacity onPress={() => deletarItem(data?.cpf)} style={styles.button}>
            <Text style={styles.buttonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Nenhum dado disponível</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
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
  header1: {
    padding: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#5E17EB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5E17EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
