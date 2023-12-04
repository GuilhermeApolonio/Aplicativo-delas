import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 
import { Home, ProfileScreen } from './views';
import DriverScreen from './views/cadastro';
import { ChatScreen } from './views/chat';
import { HistoryScreen } from './views/history';
import { DadosScreen } from './views/dados';

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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cadastro" component={DriverScreen} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Dados" component={DadosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
