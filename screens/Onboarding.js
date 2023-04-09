
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Onboarding = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const isFirstNameValid = firstName.length >= 3; // minimum length of 3
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // simple email validation

  const isFormValid = isFirstNameValid && isEmailValid;

  const handleNext = () => {
    // Validate user inputs here
    // navigation.navigate('Profile', { firstName: firstName, email: email });
    navigation.navigate('Home');
  }

        return (
          <KeyboardAvoidingView style={styles.container} behavior={"padding"}>

                    <View style={styles.container}>
                    <View style={styles.imageContainer}>
<Image source={require('./images/logo2.png')} style={styles.logo}/>
</View>
            <View style={styles.header}>
              <Text style={styles.headerText}>{'\n'}LITTLE LEMON</Text>
            </View>
             <View>
            <Text style={styles.subText}>{'\n'}Let's get to know you better</Text>
            </View>

            <TextInput 
            placeholder="User Name" 
            placeholderTextColor="#A9A9A9" 
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName} 
            />

            <TextInput 
            placeholder="Email" 
            placeholderTextColor="#A9A9A9" 
            style={styles.input}
            value={email}
            onChangeText={setEmail} 
            />
            <TouchableOpacity style={[styles.button, !isFormValid && styles.disabledButton]}
        disabled={!isFormValid} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        
    </KeyboardAvoidingView>

        );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignContent: 'center',
    backgroundColor: "#495E57"

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    margintop: 70,
    color: "grey",
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    marginTop: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    letterSpacing: 7,
  },

  subText: {
    fontSize: 24,
    fontWeight: 'regular',
    marginBottom: 50,
    color: 'white',
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',

  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '4%',
  },
  logo: {
    marginTop: 20,
    width: 60,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    fontSize: 21,

  },
  button: {
    backgroundColor: '#F4CE14',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    height: 50,
  },

  disabledButton: {
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    height: 50,
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default Onboarding;
