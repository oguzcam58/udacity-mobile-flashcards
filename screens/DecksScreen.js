import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { fetchDecksResults } from '../utils/api';
import { receiveDecksAction } from '../actions';

class DecksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    ready: false,
  };

  componentDidMount () {
    const { dispatch } = this.props;

    fetchDecksResults()
      .then((decks) => dispatch(receiveDecksAction(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  onPress = (deck) => {
    this.props.navigation.navigate('DeckDetails', { title: deck.title });
  }

  render() {
    const { ready } = this.state;
    if (ready === false) {
      return (
        <View style={styles.container}>
          <Text>{JSON.stringify(this.props)}</Text>
        </View>
      );
    }

    const { decks } = this.props;
    const decksArray = Object.keys(decks)
      .map((title) => decks[title])
      .filter((item) => (item.title && item.questions));

    return (
      <View style={styles.container}>
        <FlatList
          data={decksArray}
          keyExtractor={item => item.title}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.onPress(item)}>
              <View style={styles.item} key={item.title}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ fontSize: 20 }}>{item.questions && item.questions.length} cards</Text>
              </View>
            </TouchableOpacity>}
          ListEmptyComponent={() =>
            <View style={styles.item}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>No decks defined yet.</Text>
            </View>}
          />
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
  item: {
    backgroundColor: '#eee',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
//
// const decks = {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// };

function mapStateToProps (decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DecksScreen);
