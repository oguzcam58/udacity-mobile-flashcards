import React from 'react';
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { deleteDeckAction } from '../actions';
import { deleteDeck } from '../utils/api';

class DeckDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  addCard = (deck) => {
    this.props.navigation.navigate('AddQuestion', { deck });
  };

  startQuiz = (deck) => {
    if (deck.questions.length < 1) {
      Alert.alert(
        "Start Quiz",
        "Can't start the quiz because there is no card defined for this deck, yet.",
        [{ text: 'Cancel', onPress: () => console.log('Canceled') }],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('Quiz', { deck });
    }
  };

  deleteDeck = (title) => {
    this.props.dispatch(deleteDeckAction(title));
    deleteDeck(title);
    this.props.navigation.navigate('Decks');
  };

  renderSuccess(deck) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20 }}>
            {deck.title}
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: 'gray' }}>
            {deck.questions.length} cards
          </Text>

        </View>
        <View style={{flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]} onPress={() => this.addCard(deck)}>
            <Text style={styles.buttonTxt}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'black' }]} onPress={() => this.startQuiz(deck)}>
            <Text style={styles.buttonTxt}>
              Start Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => this.deleteDeck(deck.title)}>
            <Text style={[styles.buttonTxt, { color: 'red' }]}>
              Delete Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { navigation, decks } = this.props;
    const title = navigation.getParam('title', '');
    const deck = decks[title];

    if (deck) {
      return this.renderSuccess(deck);
    }

    return (
      <View style={styles.container}>
        <Text>
          Cannot find the deck you want to see. Try again!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  button: {
    elevation: 4,
    borderRadius: 2,
    padding: 8,
    margin: 10,
  },
  buttonTxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckDetailScreen);
