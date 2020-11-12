import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { 
  clearLocalNotification,
  setLocalNotification
} from '../utils/helper'

import { UpdateDeckToStorage } from '../utils/api'
import { updateDeck } from '../actions/index'



class QuizScreen extends Component {
  /***
   * Display only one element at a time in react with .map()
   * ref: https://stackoverflow.com/questions/58144849/display-only-one-element-at-a-time-in-react-with-map
   */

  state = {
    index: 0,
    correctAnswers: 0,
    showAnswer: false,
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  componentDidUpdate() {
    const { deck, cards } = this.props;
    if ( this.state.index >= cards.length) {
      UpdateDeckToStorage(deck.title, true).then(
        this.props.dispatch(updateDeck(deck.title, true))
      )
    }
  }

  handleUserAnswers(userAnswer, realAnswer) {
    if (realAnswer.toLowerCase() === userAnswer) {
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
        index: prevState.index + 1,
      }));
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
  }

  reset(title) {
    
      UpdateDeckToStorage(title, false).then(
        this.props.dispatch(updateDeck(title, false)),
        this.props.navigation.navigate('Deck', { 'deck_title': title })
      )
  }

  render() {

    const { cards, deck, navigation } = this.props;
    const { index, correctAnswers, showAnswer} = this.state;
    if (cards.length === 0) {
      return (
        <View style={styles.quizCompleted}>
          <Text>
            Sorry, you cannot take the quiz because there is not card in the desk.
          </Text>
        </View>
      )
    }
    else if ( index < cards.length && deck.attempted === false ) {
      
      const cardQuestion = cards[index].question;
      const cardAnswer = cards[index].answer;
      
      return (
        <View style={ styles.quizDetails }>
          <View style={styles.quizQuestion}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>{'Question: ' + cardQuestion}</Text>
          {showAnswer === true ? (
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{cardAnswer}</Text> 
          ) : (        
              <TouchableHighlight underlayColor="white" onPress={() => this.setState({showAnswer: true})}>
                  <View>
                    <Text style={styles.answerText}>Show Answer</Text>
                  </View>
              </TouchableHighlight>
          )
            }
          </View>
          { showAnswer === false ? (
          <View style={styles.btn}>
            <TouchableOpacity style={styles.btnGreen} onPress={() => this.handleUserAnswers('yes', cardAnswer)}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRed} onPress={() => this.handleUserAnswers('no', cardAnswer)} >
              <Text style={styles.buttonText}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View> 
          ) : ([])}
          <Text style={{marginBottom: 10}}>{index+1}/{cards.length}</Text>
          </View>
      );
    } else {
      return (
        <View style={styles.quizCompleted}>
          <Text style={{fontSize: 28}}>Quiz Completed!</Text>
          <Text style={{fontSize: 20}}>Total number of correct answers are {correctAnswers}/{cards.length}.</Text>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity style={styles.btnGreen} onPress={() => this.reset(deck.title)}>
              <Text style={styles.buttonText}>
                Reset Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRed} onPress={() => navigation.navigate('Deck', {'deck_title': deck.title})} >
              <Text style={styles.buttonText}>
                Back to Deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

  const styles = StyleSheet.create({
    quizDetails: {
      flex: 1, 
      alignItems: 'center',
      backgroundColor: 'slateblue',
      },
    
    quizQuestion: {
      margin: 20,
      alignItems: 'center',
      },
    btn: {
      justifyContent:'center', flex: 2,
    },
    btnGreen: {
      width: 250,
      height: 50,
      margin: 5,
      backgroundColor: 'green'
    },
    btnRed: {
      width: 250,
      height: 50,
      margin: 5,
      backgroundColor: 'red',
    },
    buttonText: {
      marginTop: 12,
      textAlign: 'center',
      color: 'white'
    },
    answerText: {
      marginTop: 10,
      color: 'red',
      fontSize: 20,
      textAlign: 'center'
    },
    quizCompleted: {
      flex: 2,
      textAlign: 'center',
      justifyContent: 'flex-start',
    }
  });
  
  function mapStateToProps(decks, props) {
    const params = props.route.params;
    const deck = decks[params.deck_title]
    var cards = []
  
    if (deck && deck.questions) {
       cards = deck.questions
    }
    return {
      deck: deck,
      cards: cards
    };
  }
  
  export default connect(mapStateToProps)(QuizScreen);
