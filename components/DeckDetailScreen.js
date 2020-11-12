import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteDeck } from '../actions/index'
import { DeleteDeckFromStorage } from '../utils/api'


class DeckDetailsScreen extends Component {
  
  deleteDeck = (deck) => {
    if (deck) {
      DeleteDeckFromStorage(deck.title)
      this.props.dispatch(deleteDeck(deck.title))
      this.props.navigation.goBack()
    }
  }
  render () {
    const { deck, cards, navigation } = this.props
    return (
      <View style={ styles.deckDetails }>
        <View style={styles.deckUpperContent}>
          {deck && <Text style={{fontSize: 25, fontWeight: 'bold'}}>{deck.title}</Text>}
          <Text style={{fontSize: 14, color: 'lightgrey'}}>{cards && cards.length} cards</Text>
        </View>
        <View style={{justifyContent:'center', flex: 2}}>
          <TouchableOpacity style={styles.button} onPress={() => 
            navigation.navigate('AddCard', {'deck_title': deck.title})
          }>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => 
            navigation.navigate('Quiz', {'deck_title': deck.title})
            }>
            <Text style={styles.buttonText}>
              Start Quiz
            </Text>
          </TouchableOpacity>
          <TouchableHighlight underlayColor="white" onPress={() => this.deleteDeck(deck)}>
            <View>
              <Text style={styles.deleteDeckText}>Delete Deck</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'lightblue',
      width: 250,
      height: 50,
      margin: 5
    },
  
    deleteDeckText: {
      marginTop: 10,
      color: 'red',
      fontSize: 20,
      textAlign: 'center'
      
    },
  
    buttonText: {
      marginTop: 12,
      textAlign: 'center',
    },
    
    deckDetails: {
      flex: 1, 
      alignItems: 'center',
      backgroundColor: 'slateblue',
      justifyContent: 'space-between'
    },
  
    deckUpperContent: {
      marginTop: 50,
      flex: 0.18,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  });
  
  function mapStateToProps(decks, props) {
    const params = props.route.params;
    const deck = decks[params.deck_title]
    let cards = []
    
    if (deck) {
       cards = deck.questions
    }
    return {
      deck: deck,
      cards: cards
    };
  }

  export default connect(mapStateToProps)(DeckDetailsScreen);
