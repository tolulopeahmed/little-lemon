import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import PhoneInput from 'react-native-phone-number-input';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ route, navigation }) => {
  const [email, setEmail] = useState(route.params?.email || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null); // image state
  const [newsletter, setNewsletter] = useState(false);
  const [promotions, setPromotions] = useState(false);
  const [newFeatures, setNewFeatures] = useState(false);
  const [firstName, setFirstName] = useState(route.params?.firstName || '');


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
      setCircularImage(false);
    }
  };

 // function to handle removing the image
 const removeImage = () => {
  setImage(null);
};

  useEffect(() => {
    // get user data from async storage or API
       setPhoneNumber('');

    // check and request permission to access camera roll
    (async () => {
      if (Constants.platform.ios || Constants.platform.android) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  

  // function to validate phone number input
  const validatePhoneNumber = (input) => {
    // regex to check for valid US phone numbers
    const regex = /^\+1\d{10}$/;
    if (regex.test(input)) {
      setPhoneNumber(input);
    }
  };

  //function to handle saveChanges
  const saveChanges = async () => {
    try {
      // Save all the data to the disk using AsyncStorage or any other storage solution
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('newsletter', newsletter.toString());
      await AsyncStorage.setItem('promotions', promotions.toString());
      await AsyncStorage.setItem('newFeatures', newFeatures.toString());
      await AsyncStorage.setItem('image', image);

      // Show a success message
      alert('Changes saved successfully');
    } catch (error) {
      // Show an error message
      alert('Error!');
    }
  };

  //function to handle logout
  const logout = async () => {
      await AsyncStorage.clear(); // Clear all data from disk
      navigation.navigate('Onboarding'); // Navigate to the Onboarding screen
    };
  
  
  



  return (
    <ScrollView>
      <View style={styles.container}>
      {/* Header */}
      <Text style={styles.sectionTitle}>Personal Information</Text>
      {/* Personal Information */}
      <View style={styles.section}>

        <View style={styles.avatarContainer}>
        {image === null ? (
          <TouchableOpacity onPress={pickImage}>
    <Image source={require('./images/Profile1.png')} style={styles.logo} />
    </TouchableOpacity>
  ) : (
      <TouchableOpacity onPress={pickImage}>
      <Image source={{ uri: image}} style={styles.logo}/>
      </TouchableOpacity>
  )}
      <View>
        <View><Text style={styles.UserName}>{firstName}</Text>
              <Text style={styles.Email}>{email}</Text>
        </View>
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage()}>
              <Text style={styles.editButtonText}>Remove Image</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>

        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
        />
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
        />
      </View>

      {/* Email Notification */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Notification</Text>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={validatePhoneNumber}
          placeholder="e.g. 08033000000"
          keyboardType="phone-pad"
        />

<Text style={styles.label}>Your Preferences</Text>

  <View style={styles.FlexNewsLetter}>
    <TouchableOpacity style={styles.checkbox} onPress={() => setNewsletter(!newsletter)}>
    <MaterialCommunityIcons name={newsletter ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="black" />
    <Text style={styles.checkboxLabel}>Receive newsletter</Text>
  </TouchableOpacity> 
  </View>
  <TouchableOpacity style={styles.checkbox} onPress={() => setPromotions(!promotions)}>
    <MaterialCommunityIcons name={promotions ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="black" />
    <Text style={styles.checkboxLabel}>Receive promotions</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.checkbox} onPress={() => setNewFeatures(!newFeatures)}>
    <MaterialCommunityIcons name={newFeatures ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="black" />
    <Text style={styles.checkboxLabel}>Receive updates on new features</Text>
  </TouchableOpacity>

{/*Save Changes button*/}
<TouchableOpacity style={styles.saveButton} onPress={() => saveChanges()}>
  <Text style={styles.saveButtonText}>Save Changes</Text>
</TouchableOpacity>

      
      </View>

      {/* Logout Button */}
      <View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
  <Text style={styles.logoutButtonText}>Logout</Text>
</TouchableOpacity>

      </View>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 27,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 
  UserName: {
    color: 'black',
    marginLeft: 20,
    fontSize: 30,
    color: 'green',
  },

  Email: {
    fontSize: 13,
    marginLeft: 20,
    fontWeight: 'regular',
    fontStyle: 'italic',
    marginBottom: 10,
    color: 'grey',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: 'silver',

    },
  section: {
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#495E57',
  },
  label: {
    fontSize: 13,
    fontWeight: 'regular',
    fontStyle: 'italic',
    marginTop: 3,
    color: 'silver',
  },

  editButton: {
    backgroundColor: '#495E57',
    padding: 5,
    alignItems: 'center',
    borderRadius: 7,
    height: 30,
    width: 90,
    marginLeft: 20,

  },
  removeButton: {
    backgroundColor: 'grey',
    padding: 5,
    alignItems: 'center',
    borderRadius: 7,
    height: 30,
    width: 110,
    marginLeft: 10,
  },
  
  editButtonsContainer: {
    backgroundColor: '#F2F4F7',
    marginTop: 0,
    borderRadius: 7,
    flexDirection: 'row',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //alignSelf: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'silver',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 7,
    fontSize: 21,
  },
  
  checkbox: {
    marginTop: 10,
    flexDirection: 'row',

  },

  FlexNewsLetter: {
    flexDirection: 'row',
  },

  saveButton: {
    backgroundColor: 'silver',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    height: 50,
    marginTop: 20,
  },
  saveButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },

  logoutButton: {
    backgroundColor: '#F4CE14',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
},
logoutButtonText:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 20,

},
});

export default Profile;
