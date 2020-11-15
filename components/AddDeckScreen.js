import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import { StoreDeckToStorage } from '../utils/api'
import { addDeck } from '../actions/index'
import {connect} from 'react-redux';

class AddDeckScreen extends Component {
    
    state = {
        title: '',
        error: false
    }

    handleSubmit = () => {
      const { title } = this.state
      
      // Validating input.
      if (title === '') {
        this.setState({
          error: true
        })
        return;
      }
      StoreDeckToStorage(title)
      this.props.dispatch(addDeck(title, 0));
      this.props.navigation.goBack()
    };

    render () {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.newDeckTitle}>What is the title of your new deck?</Text>
          <TextInput
            style={[styles.input, {borderColor: this.state.error === true ? 'red' : 'gray' }]}
            placeholder="Deck Title"
            onChangeText={title => this.setState({title: title, error: false})}
            defaultValue={this.state.title}
            />
            {this.state.error && <Text style={styles.error}>Error: Field Required.</Text>}
            <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.createDeckButton}>
              <Button
                title="Create Deck" onPress={() => this.handleSubmit()}
              />
            </View>
            </View>
        </View>
      );
  }
}
  
const styles = StyleSheet.create({
  input: {
    height: 40, 
    borderWidth: 1, 
    margin: 10,
    alignSelf: 'stretch',
    alignItems: 'flex-start'
  },

  newDeckTitle: {
    margin: 15,
    fontWeight: 'bold',
    fontSize: 20
  },

  createDeckButton: {
    flex: 2,
    justifyContent: 'flex-end',
    width: 350,
    marginBottom: 15,
  },
  
  error: {
    color: 'red'
  }

});

export default connect()(AddDeckScreen)
