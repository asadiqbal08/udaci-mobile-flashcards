import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import  AddCardScreen from './components/AddCardScreen'
import DecksListViewScreen from './components/DecksListViewScreen'
import AddDeckScreen from './components/AddDeckScreen'
import DeckDetailsScreen from './components/DeckDetailScreen'
import QuizScreen from './components/QuizScreen'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reduer from './reducers/index';
import middleware from './middleware';


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor: backgroundColor, height: 20 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const DeckStack = createStackNavigator();
function DeckStackScreen() {
  return (
    <DeckStack.Navigator>
      <DeckStack.Screen options={{headerShown: false}} name="Decks" component={DecksListViewScreen} />
      <DeckStack.Screen name="Deck" options={{ headerStyle: {backgroundColor: 'white'}}} component={DeckDetailsScreen} />
      <DeckStack.Screen name="AddCard" options={{ headerStyle: {backgroundColor: 'white'}}} component={AddCardScreen} />
      <DeckStack.Screen name="Quiz" options={{ headerStyle: {backgroundColor: 'white'}}} component={QuizScreen} />
    </DeckStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
function FlashCardTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckStackScreen}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="card-bulleted-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeckScreen}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();
class App extends React.Component {
  
  render() {
    return (
      <Provider store={createStore(reduer, middleware)}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor='black'/>
          <RootStack.Navigator>
            <RootStack.Screen name="Home" component={FlashCardTabs} options={{ headerShown: false }}  />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;
