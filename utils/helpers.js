import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../constants/StorageKeys';

export function newDeck(title) {
  return {
    title,
    questions: [],
  };
}
