import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { UpdateDeckToStorage } from '../utils/api'
import { updateDeck } from '../actions/index'
import QuizResult from './QuizResult'



class QuizScreen extends Component {
  /***
   * Display only one element at a time in react with .map()
   * ref: https://stackoverflow.com/questions/58144849/display-only-one-element-at-a-time-in-react-with-map
   */

  getInitialState = () => ({
    index: 0,
    correctAnswers: 0,
    showAnswer: false,
  })

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidUpdate() {
    const { deck, cards } = this.props;
    if ( this.state.index >= cards.length) {
      UpdateDeckToStorage(deck.title, true).then(
        this.props.dispatch(updateDeck(deck.title, true))
      )
    }
  }

  handleUserAnswers(userAnswerCorrect) {
    if (userAnswerCorrect) {
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
        index: prevState.index + 1,
        showAnswer: false
      }));
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        showAnswer: false
      }));
    }
  }

  reset(title) {
    UpdateDeckToStorage(title, false).then(
      this.props.dispatch(updateDeck(title, false)),
      this.setState(this.getInitialState())
      )
  }

  render() {

    const { cards, deck } = this.props;
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
      <View style={styles.quizDetails}>
        <Text style={styles.question}>{cardQuestion + ' ?'}</Text>
          {showAnswer === true ? (
            <View>
              <Text style={styles.answer}>Ans: {cardAnswer}</Text>
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnGreen} onPress={() => this.handleUserAnswers(true)}>
                  <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRed} onPress={() => this.handleUserAnswers(false)} >
                  <Text style={styles.buttonText}>
                    Incorrect
                  </Text>
                </TouchableOpacity>
              </View>  
            </View>
          ) : (        
              <TouchableHighlight underlayColor="white" onPress={() => this.setState({showAnswer: true})}>
                  <View>
                    <Text style={styles.answerText}>Show Answer</Text>
                  </View>
              </TouchableHighlight>
          )
            }
          <View style={styles.footer}>
            <Text style={styles.footerText}>{index+1}/{cards.length}</Text>
          </View> 
      </View>
      );
    } else {
      return (
        <QuizResult 
          onReset={this.reset.bind(this)}
          correctAnswers={correctAnswers}
          totalCards={cards.length}
          title={deck.title}
          navigation={this.props.navigation}
        />
      )
    }
  }
}

  const styles = StyleSheet.create({
    quizDetails: {
      flex: 1, 
      alignItems: 'center',
      backgroundColor: 'slateblue'
    },
    question: {
      fontSize: 25,
      fontWeight: 'bold'
    },
    answer: {
      margin: 10,
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'stretch',
    },
    btnView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 0.9
    },
    btnGreen: {
      width: 250,
      height: 50,
      margin: 5,
      backgroundColor: 'green',
      borderRadius:10,
      borderWidth: 1
    },
    btnRed: {
      width: 250,
      height: 50,
      margin: 5,
      backgroundColor: 'red',
      borderRadius:10,
      borderWidth: 1
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
    footer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    footerText: {
      marginBottom: 5
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
