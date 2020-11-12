import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import { StoreDeckToStorage } from '../utils/api'
import { addDeck } from '../actions/index'
import {connect} from 'react-redux';

class AddDeckScreen extends Component {
    
    state = {
        title: '',
    }

    handleSubmit = () => {
      const { title } = this.state
      StoreDeckToStorage(title)
      this.props.dispatch(addDeck(title, 0));
      this.props.navigation.goBack()
    };

    render () {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.newDeckTitle}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={title => this.setState({title: title})}
            defaultValue={this.state.title}
            />
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
    borderColor: 'gray', 
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
  }

});

export default connect()(AddDeckScreen)
