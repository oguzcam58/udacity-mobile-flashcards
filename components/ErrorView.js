import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorView() {
  return (
    <View style={styles.container}>
      <Text style={{ backgroundColor: 'gray' }}>
        An error occurred, please try again.
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
