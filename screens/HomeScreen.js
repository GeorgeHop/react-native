import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currency: 'usd',
      ratio: 0,
      plnValue: 0,
      plnText: '',
      exchangeValue: 0,
      exchangeText: '',
      is_loaded: false ,
    };
  }

  componentDidMount() {
    this.exchangeDataLoader();
  }

  exchangeDataLoader() {
    fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${this.state.currency}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            is_loaded: true,
            ratio: result.rates[0].mid,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  isValidFloat = text => !text.endsWith('.') && /^[0-9,.]*$/.test(text);
  parseFloat = text => parseFloat(text.replace(',', '.'));
  prettifyFloat = text => String(+(parseFloat(text || 0).toPrecision(4)));

  handleCurrencyChange = value => {
    this.setState({
      currency: value,
    }, this.exchangeDataLoader);
  };

  handlePlnChange = text => {
    if (!this.isValidFloat(text)) {
      this.setState({
        plnText: text,
      });
    }
    else {
      this.setState(state => {
        let value = this.parseFloat(text) * (1 / state.ratio);
        return {
          plnText: text,
          exchangeValue: value,
          exchangeText: this.prettifyFloat(value),
        };
      });
    }
  };

  handleExchangeChange = text => {
    if (!this.isValidFloat(text)) {
      this.setState({
        exchangeText: text,
      });
    }
    else {
      this.setState(state => {
        let value = this.parseFloat(text) * state.ratio;
        return {
          exchangeText: text,
          plnValue: value,
          plnText: this.prettifyFloat(value),
        };
      });
    }
  };

  render() {
    return (
        <View style={styles.exchangeContainer}>
          <Text style={styles.textInputLabel}>Enter to convert</Text>
          <View style={styles.horContainer1}>
            <View style={styles.fromContainer}>
              <Text style={styles.labelText}>{this.state.currency.toUpperCase()}</Text>
              <TextInput keyboardType="decimal-pad" style={styles.textInput}
                         value={this.state.exchangeText}
                         onChangeText={this.handleExchangeChange}
              />
              <Text style={styles.labelText}>Select money type</Text>
              <Picker selectedValue={this.state.currency} style={styles.selectType}
                      onValueChange={this.handleCurrencyChange}
              >
                <Picker.Item label="US Dollar" value="usd" />
                <Picker.Item label="Euro" value="eur" />
                <Picker.Item label="British Pound" value="gbp" />
                <Picker.Item label="Indian Rupee" value="inr" />
                <Picker.Item label="Australian Dollar" value="aud" />
                <Picker.Item label="Canadian Dollar" value="cad" />
                <Picker.Item label="Singapore Dollar" value="sgd" />
                <Picker.Item label="Emirati Dirham" value="aed" />
                <Picker.Item label="Bermudian Dollar" value="bmd" />
              </Picker>
            </View>

            <View style={styles.fromContainer}>
              <Text style={styles.labelText}>PLN</Text>
              <TextInput keyboardType="decimal-pad" style={styles.textInput}
                         value={this.state.plnText}
                         onChangeText={this.handlePlnChange}
              />
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  exchangeContainerMain: {
    width: '100%',
    height: '100%'
  },
  exchangeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d35400'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  textInputLabel : {
    fontSize: 16,
    color: 'white',
    justifyContent: 'flex-start',
    marginTop: 10,
    fontWeight: '500'
  },
  horContainer1: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10,
    justifyContent : 'space-around'
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 3,
    borderColor: '#2c3e50',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'flex-end'
  },
  labelText : {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    marginBottom : 5
  },
  selectType : {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#2980b9',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'flex-end'
  },


  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  resultLabelWrap : {
    flex:1,
    flexDirection : 'row',
    justifyContent: 'flex-end'
  },
  resultLabel : {
    fontSize: 40,
    color: 'white',
    marginTop: 6,
  },
  altLabel : {
    fontSize: 24,
    color: 'white',
    marginTop: 6,
  },
  fromContainer: {
    flex : 2,
    paddingRight : 40
  },
  switchContainer: {
    flex : 1,
    paddingLeft : 10,
    paddingRight : 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon : {
    marginTop : 15,
    width : 36,
    height : 36
  },
  convertContainer : {
    flex :1,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'transparent'
  },
  button: {
    height: 36,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#6BBD6D',
    borderColor: '#0ea378',
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  convertButton: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  resultContainer: {
    marginBottom: 20
  }
});
