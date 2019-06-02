import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_QUESTION } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK:
      const newState = Object.keys(state).reduce((object, key) => {
        if (key !== action.title) {
          object[key] = state[key];
        }
        return object;
      }, {});

      return {
        ...newState,
      };
    case ADD_QUESTION:
      const { title } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat(action.question),
        }
      }
    default:
      return state;
  }
}

export default decks;
