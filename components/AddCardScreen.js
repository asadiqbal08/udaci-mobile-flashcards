import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { StoreCardToStorage } from '../utils/api'
import { addCard } from '../actions/index'
import {connect} from 'react-redux';
class AddCardScreen extends Component {
    
    state = {
        question: '',
        answer: ''
    }

    handleSubmit = () => {
      const params = this.props.route.params;
      const { question, answer } = this.state
      StoreCardToStorage(params.deck_title, question, answer)
      this.props.dispatch(addCard(params.deck_title, question, answer));
      this.props.navigation.goBack()
  
    };

    render () {
     return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Question"
          onChangeText={question => this.setState({question: question})}
          defaultValue={this.state.question}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          onChangeText={answer => this.setState({answer: answer})}
          defaultValue={this.state.answer}
        />
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
    borderColor: 'gray', 
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
}
});

export default connect()(AddCardScreen)
