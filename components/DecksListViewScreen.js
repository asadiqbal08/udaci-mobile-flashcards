import React, {Component} from 'react';
import { Text, View, TouchableHighlight,TouchableOpacity,  StyleSheet, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { getInitialData } from '../actions/index'
import { setLocalNotification } from '../utils/helper'

class DecksListViewScreen extends Component {

  constructor() {
    super();
    this.animatedValues = [] 
  }

  componentDidMount() {
    setLocalNotification()
    this.props.getAllDecks()
  }

  animateDeckText (index, deckTitle) {
    /**
     * Animate the text.
     */
    this.animatedValues[index].setValue(0);
    Animated.timing(
      this.animatedValues[index],
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => this.props.navigation.navigate('Deck', { 'deck_title': deckTitle }))
  }

  renderAllDecks (decks) {
    /**
     * Render all decks to screen.
     */
    
    if(Object.entries(decks).length === 0 && decks.constructor === Object) {
      return
    }
    
    Object.entries(decks).forEach(k => {
      this.animatedValues.push(new Animated.Value(0))
    });

    let decksData = Object.keys(decks).map((key, index) => {
      
      const transform = this.animatedValues[index].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 34, 0]
      });
      return (      
        <TouchableHighlight onPress={() => this.animateDeckText(index, decks[key].title)} underlayColor="white" style={styles.deckBox} key={"deck_" + index}>
          <View>
            <Animated.Text key={"textoption" + index }  style={{transform: [{ translateX: transform }], color: 'green', fontSize: 30}}>
                { decks[key].title }
            </Animated.Text>
            {decks[key].questions ? (
              <Text style={styles.cardText}>{decks[key].questions.length} Cards</Text>
              ) : (
              <Text style={styles.cardText}>0 Card</Text>
            )}
          </View>
        </TouchableHighlight>
      )})
    return decksData;
  }
  
  render () {
    const { decks } = this.props;
    return (
      <View style={styles.decksContainer}>
        {this.renderAllDecks(decks)}
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  decksContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: 'red'
  },

  deckBox: {
    backgroundColor: 'lightgrey',
    margin: 2,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: 10
  }
});

function mapStateToProps(decks) {
  return {
    decks: decks,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    getAllDecks: () => dispatch(getInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksListViewScreen);
