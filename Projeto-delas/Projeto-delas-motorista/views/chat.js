import { Button, View, Text, StyleSheet } from 'react-native';

export function ChatScreen({navigation}) {
  return (
    
    <View>
      <View style={styles.header}>
          <Text style={styles.headerText}>Chat</Text>
      </View>

    
          <Text  style={styles.Text}>Nenhum chat iniciado</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({

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
    textAlign: 'center',
    right: 0

  },
  Text:{
    paddingTop: 400,
    fontSize: 15,
    color: 'grey',
    textAlign: 'center',
  }
})