import React from 'react';
import { View, Image} from 'react-native';
import styles from './styles/global.js';

function TelaRetorno({ navigation }) {
    setTimeout(() => {
    navigation.navigate('TelaHome');
  }, 4000);
  
  return (
       <View style={styles.container} >
 <Image style={{ width:330,height:280}}
          source={require('./assets/logo.jpg')} />
    </View>
  );
}
export default TelaRetorno;
