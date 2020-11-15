import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import { StoreCardToStorage } from '../utils/api'
import { addCard } from '../actions/index'
import {connect} from 'react-redux';
class AddCardScreen extends Component {
    
    state = {
        question: '',
        answer: '',
        errors: []
    }

    handleSubmit = () => {
      let _errors = []
      const params = this.props.route.params;
      const { question, answer } = this.state

      // Input field validations.
      if (question === '') {
        _errors.push('question')
      }

      if (answer === '') {
        _errors.push('answer')
      }

      if (_errors.length) { 
        this.setState({ errors: _errors });
        return;
      }
    
      StoreCardToStorage(params.deck_title, question, answer)
      this.props.dispatch(addCard(params.deck_title, question, answer));
      this.props.navigation.goBack()
  
    };

    render () {
     return (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {borderColor: this.state.errors.indexOf('question') != -1 ? 'red' : 'gray' }]}
          placeholder="Question"
          onChangeText={question => this.setState({question: question, errors: []})}
          defaultValue={this.state.question}
        />
        <TextInput
          style={[styles.input, {borderColor: this.state.errors.indexOf('answer') != -1 ? 'red' : 'gray' }]}
          placeholder="Answer"
          onChangeText={answer => this.setState({answer: answer, errors: []})}
          defaultValue={this.state.answer}
        />        
        {this.state.errors.length > 0 && <Text style={styles.error}>Error: Fields Required.</Text>}
        <View style={{alignItems: 'center', flex: 1}}>
        <View style={styles.submitButton}>
            <Button
                title="Submit"
                onPress={() => {this.handleSubmit()}}/>
        </View>
        </View>
      </View>

    );
  }
}
  

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  input: {
      height: 40, 
      borderWidth: 1, 
      margin: 10,
      marginBottom: 5,
      alignSelf: 'stretch'

  },
  submitButton: {
      justifyContent: 'flex-end',
      flex: 1,
      width: 350,
      margin: 5,
      alignSelf: 'stretch'
  },
  error: {
    color: 'red'
  }
});

export default connect()(AddCardScreen)
