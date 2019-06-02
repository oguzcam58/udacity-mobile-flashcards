import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { addQuestionAction } from '../actions';
import { addQuestion } from '../utils/api';

class AddQuestionScreen extends React.Component {
  static navigationOptions = {
    title: "Add Card"
  }

  state = {
    question: '',
    answer: '',
  }

  addQuestion = () => {
    const { question, answer } = this.state;
    const { navigation, dispatch } = this.props;
    const deck = navigation.getParam('deck');

    const actionItem = {
      title: deck.title,
      question: { question, answer },
    };

    dispatch(addQuestionAction(actionItem));
    addQuestion(actionItem);

    this.setState({
      question: '',
      answer: '',
    });

    navigation.navigate('DeckDetails', { title: deck.title });
  };

  render() {
    return (
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <TextInput
          multiline={true}
          numberOfLines={3}
          maxLength={100}
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
          />
        <TextInput
          multiline={true}
          numberOfLines={3}
          maxLength={100}
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
          />
        <TouchableOpacity style={styles.btn} onPress={this.addQuestion}>
          <Text style={styles.btnTxt}>
            Add New Question
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
  input : {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    fontSize: 25,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'black',
    elevation: 4,
    borderRadius: 2,
    padding: 8,
    margin: 10,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
  },
});

export default connect()(AddQuestionScreen);
