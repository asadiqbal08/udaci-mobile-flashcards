import { getDecksFromStorage } from '../utils/api'

export const FETCHED_DECKS  = 'FETCHED_DECKS'
export const ADD_DECK       = 'ADD_DECK'
export const ADD_CARD       = 'ADD_CARD'
export const DELETE_DECK    = 'DELETE_DECK'
export const UPDATE_DECK    = 'UPDATE_DECK'


export function fetchedDecks (decks) {
  return {
    type: FETCHED_DECKS,
    decks,
  }
}

export function addCard (deck_title, question, answer) {
  return {
    type: ADD_CARD,
    question,
    answer,
    deck_title
  }
} 

export function addDeck (deck_title, attempted) {
    return {
      type: ADD_DECK,
      deck_title,
      attempted
    }
} 

export function updateDeck (deck_title, attempted) {
  return {
    type: UPDATE_DECK,
    deck_title,
    attempted
  }
} 

export function deleteDeck (deck_title) {
  return {
    type: DELETE_DECK,
    deck_title,
  }
}

export function getInitialData() {
  return (dispatch) => {
    return Promise.all([
      getDecksFromStorage()
    ]).then(([ decks ]) => {
      dispatch(fetchedDecks(decks));
    })
  };
}
