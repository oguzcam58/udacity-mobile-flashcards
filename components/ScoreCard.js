import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default function ScoreCard({ score, title }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '500', color: 'red' }}>
        You got {score} from {title} deck.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
