import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { 
    clearLocalNotification,
    setLocalNotification
  } from '../utils/helper'
  

class QuizResult extends Component {
    
    componentDidMount = () => {
        clearLocalNotification().then(setLocalNotification)
    }

    render () {
        const { onReset, correctAnswers, totalCards, title, navigation} = this.props
        
        return (
            <View style={styles.quizCompleted}>
            <Text style={{fontSize: 28}}>Quiz Completed!</Text>
            <Text style={{fontSize: 20}}>Total number of correct answers are {correctAnswers}/{totalCards}.</Text>
            <View style={{alignSelf: 'center', marginTop: 40}}>
                <TouchableOpacity style={styles.btnGreen} onPress={() => onReset(title)}>
                    <Text style={styles.buttonText}>
                        Reset Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRed} onPress={() => navigation.navigate('Deck', {'deck_title': title})} >
                    <Text style={styles.buttonText}>
                    Back to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

export default QuizResult;

const styles = StyleSheet.create({

    quizCompleted: {
      flex: 2,
      textAlign: 'center',
      justifyContent: 'flex-start',
      marginTop: 10
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
      }
  });
