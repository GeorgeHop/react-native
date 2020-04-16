import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import {Ionicons} from "@expo/vector-icons";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratesData:[],
      effectiveDate:'',
      rates:[],
      rate: {
        code: '',
        currency: '',
        mid: '',
      }
    }
  }

  componentDidMount() {
     this.loadRaresData();
  }

  loadRaresData() {
     fetch(`http://api.nbp.pl/api/exchangerates/tables/a/`)
         .then(res => res.json())
         .then((result) => {
           this.setState({
             ratesData: result,
             effectiveDate: result[0].effectiveDate,
             rates: result[0].rates
           });
           console.log(result[0].rates);
         })
         .catch((error) => {
           console.error(error);
         })
  }

  render() {
    let {ratesData, rateData, effectiveDate, rates} = this.state;
    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {rates.map(function(listItem, index){
              return (
                <View key={index} style={styles.rateDataView}>
                  <View>
                    <Text style={{fontSize:20}}>{listItem.code}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize:20}}>{listItem.currency}</Text>
                  </View>
                  <View style={styles.midView}>
                    <Text style={{fontSize:20}}>{listItem.mid} zl</Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
    );
  }

}

LinksScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rateDataView: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffbe76',
    marginTop: 1,
    marginBottom: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  midView: {
    height: 30,
    width: '100%',
    backgroundColor: '#ecf0f1',
    marginLeft: 300,
    marginTop: -35,
    borderRadius: 5,
    borderColor: '#2c3e50',
    borderWidth: 3,
  },
  currencyDateBlock: {
    height: '45',
    width: '100%',
    backgroundColor: '#2c3e50',
  },
  currencyDateText: {
    fontSize: 20,
    backgroundColor: '#ecf0f1',
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
