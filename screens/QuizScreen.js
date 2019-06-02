import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';

class QuizScreen extends React.Component {
  state = {
    showQuestion: true,
    questionIndex: 1,
  }

  correct = () => {
    console.log("Correct");
  };

  incorrect = () => {
    console.log("Incorrect");
  };

  render() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck');

    if (!deck) {
      return this.renderErrorView();
    }

    const { showQuestion, questionIndex } = this.state;
    const currentQuestion = deck.questions[questionIndex - 1];

    return (
      <View style={styles.container}>
        <View style={{flex: 4, justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 25 }}>
            {showQuestion ? currentQuestion.question : currentQuestion.answer}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.button} onPress={this.correct}>
            <Text style={styles.buttonTxt}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.incorrect}>
            <Text style={styles.buttonTxt}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'black',
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

export default connect()(QuizScreen);
