import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DecksScreen from '../screens/DecksScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import QuizScreen from '../screens/QuizScreen';
import AddQuestionScreen from '../screens/AddQuestionScreen';

const DecksStack = createStackNavigator({
  Decks: DecksScreen,
  DeckDetails: DeckDetailScreen,
  AddQuestion: AddQuestionScreen,
  Quiz: QuizScreen,
});

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='list'
    />
  ),
};

const AddDeckStack = createStackNavigator({
  AddDeck: AddDeckScreen,
});

AddDeckStack.navigationOptions = {
  tabBarLabel: 'Add A Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='add-to-list'
    />
  ),
};

export default createBottomTabNavigator({
  DecksStack,
  AddDeckStack,
});
