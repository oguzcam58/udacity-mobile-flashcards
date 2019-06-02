export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveDecksAction (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeckAction (deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function deleteDeckAction (title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function addQuestionAction ({ title, question }) {
  return {
    type: ADD_QUESTION,
    question,
    title,
  };
}
