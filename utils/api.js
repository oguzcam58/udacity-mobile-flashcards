import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../constants/StorageKeys';
import { formatDecks } from './helpers';

export function fetchDecksResults () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => decks);
}

export function addDeck ({ title, deck }) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({ [title]: deck })
  );
}

export function deleteDeck (title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks);
      data[title] = undefined;
      delete data[title];
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    });
}

export function addQuestion ({ title, question }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks);
      data[title].questions = data[title].questions.concat(question);
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    });
}
