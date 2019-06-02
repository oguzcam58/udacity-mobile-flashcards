import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import ScoreCard from '../components/ScoreCard';

class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Quiz'
  };

  state = {
    showQuestion: true,
    questionIndex: 1,
    score: 0,
  };

  correct = () => {
    this.setState((prevState) => {
      return {
        score: prevState.score + 1,
        questionIndex: prevState.questionIndex + 1,
      }
    });
  };

  incorrect = () => {
    this.setState((prevState) => {
      return {
        questionIndex: prevState.questionIndex + 1,
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck');
    const { showQuestion, questionIndex, score } = this.state;

    if (!deck) {
      return this.renderErrorView();
    }

    if (questionIndex > deck.questions.length) {
      return (
        <View style={styles.container}>
          <ScoreCard score={score} title={deck.title} />
          <View style={{flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.button}
              onPress={() => this.setState({ showQuestion: true, questionIndex: 1, score: 0})}>
              <Text style={styles.buttonTxt}>
                Reset Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('Decks')}>
              <Text style={styles.buttonTxt}>
                Back to Decks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const currentQuestion = deck.questions[questionIndex - 1];

    return (
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 25 }}>
            {questionIndex} / {deck.questions.length}
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 25 }}>
            {showQuestion ? currentQuestion.question : currentQuestion.answer}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'white' }]}
            onPress={() => {this.setState((prevState) => { return { showQuestion: !prevState.showQuestion } })}}>
            <Text style={[styles.buttonTxt, { color: 'red' }]}>
              {showQuestion ? "Answer" : "Question"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={this.correct}>
            <Text style={styles.buttonTxt}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={this.incorrect}>
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
