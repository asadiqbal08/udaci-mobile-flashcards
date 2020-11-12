import AsyncStorage from '@react-native-community/async-storage'

const MOBILE_FLASHCARD_KEY = 'UdaciFlashCards:FlashCards'

export function StoreDeckToStorage (title) {
  return AsyncStorage.mergeItem(MOBILE_FLASHCARD_KEY, JSON.stringify({
    [title]: { 'title': title, 'attempted': false }
  }))
}

export function UpdateDeckToStorage (deckTitle, attempted) {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      const all_decks = JSON.parse(results)
      let _deck = all_decks[deckTitle]
      _deck['attempted'] = attempted
      all_decks[deckTitle] = _deck
      AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(all_decks))
    })
}

export function StoreCardToStorage (deckTitle, question, answer) {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      const all_decks = JSON.parse(results)
      let _deck = all_decks[deckTitle]
      _deck['questions'] = _deck['questions'] || [];
      _deck['questions'].push({
        'answer': answer,
        'question': question
      });
      all_decks[deckTitle] = _deck
      AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(all_decks))
    })
  }

  export function DeleteDeckFromStorage (deckTitle) {
    return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
      .then((results) => {
        const all_decks = JSON.parse(results)
        all_decks[deckTitle] = undefined
        delete all_decks[deckTitle]
        AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(all_decks))
      })
    }

export const getDecksFromStorage = async () => {
  try {
    // AsyncStorage.clear()
    const decks = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);
    const myDecks = JSON.parse(decks);
    return myDecks;

    } catch (error) {
        console.log(error, "An error occured while fetching all deck data.")
    }
}
