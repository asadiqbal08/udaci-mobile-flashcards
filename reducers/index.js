import { FETCHED_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK, UPDATE_DECK} from '../actions'
import { omit } from 'lodash'

function decks (state = {}, action) {
  switch (action.type) {
    case FETCHED_DECKS :
      const { decks } = action
      return {
        ...decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck_title]: {
          title: action.deck_title,
          attempted: action.attempted
        }
      }
    case UPDATE_DECK :
        state[action.deck_title].attempted = action.attempted
        return {
          ...state,
        }
    case ADD_CARD :
      const {deck_title, question, answer} = action
      let deck = state[deck_title]
      deck['attempted'] = false
      deck['questions'] = deck['questions'] || [];
      deck['questions'].push({
        'question': question,
        'answer': answer
      });
      return {
        ...state
      }
    case DELETE_DECK :
      return omit(state, action.deck_title)

    default :
      return state
  }
}

export default decks 
