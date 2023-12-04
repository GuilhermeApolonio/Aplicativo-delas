import { Button, View, Text, StyleSheet, Image } from 'react-native';

export function PixScreen({navigation}) {
  return (
    <View style={styles.container}>
          
    <View style={styles.header}>
    <Text style={styles.headerText}>Pix</Text>
    </View>
    <View style={styles.img}>
    <Image source = {{uri: 'https://devtools.com.br/img/pix/logo-pix-png-icone-520x520.png'}} style={{width: 200, height: 200}}></Image>
    </View>
    <Text style={styles.Text}>Sua corrida será paga em pix.</Text>
    <Text style={styles.Text2}>O aparelho do motorista vai indicar o valor a ser pago ao final da viagem.</Text>
</View>
);
}



const styles = StyleSheet.create({
container:{
backgroundColor: '#fff',
flex: 1
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
Text:{
paddingTop: 10,
fontWeight: 'bold',
fontSize: 22,
color: '#5E17EB',
textAlign: 'center',


},
Text2:{
marginHorizontal: 11,
textAlign: 'center',
fontSize: 15,
color: 'black'

},

img:{
left: 105,
paddingTop: 150
}
});
 