import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import { Home, PayScreen, ProfileScreen} from './views';
import CadScreen from './views/cadastro';
import { HistoryScreen } from './views/history';
import { ChatScreen } from './views/chat';
import { DadosScreen } from './views/dados';
import { CardScreen } from './views/card';
import { PixScreen } from './views/pix';
import { MoneyScreen } from './views/money';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#5E17EB',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#fff',
          bottom: 10,
          left: 0,
          right: 0,
          borderRadius: 55,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            )
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="female" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pagamento"
        component={PayScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Cadastro'>
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={PayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dados" component={DadosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cartao" component={CardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pix" component={PixScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Money" component={MoneyScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
