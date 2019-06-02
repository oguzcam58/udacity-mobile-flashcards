import React from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { newDeck } from '../utils/helpers';
import { addDeckAction } from '../actions';
import { addDeck } from '../utils/api';

class AddDeckScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = { title: '' };

  handleAddNewDeck = () => {
    const { title } = this.state;
    const deck = newDeck(title);

    this.props.dispatch(addDeckAction({ [title]: deck }));

    this.setState({ title: '' });

    addDeck({ title, deck });

    this.props.navigation.navigate('DeckDetails', { title: deck.title });
  }

  render() {
    return (
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20 }}>
          What is the title for the new Deck?
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={2}
          maxLength={50}
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          />
        <TouchableOpacity style={styles.addDeckBtn} onPress={this.handleAddNewDeck}>
          <Text style={styles.addDeckTxt}>
            Add New Deck
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  input: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 20,
  },
  addDeckBtn: {
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
  },
  addDeckTxt: {
    height: 60,
    fontSize: 30,
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
  },
});

export default connect()(AddDeckScreen);
