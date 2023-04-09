import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const json = await response.json();
        setMenuItems(json.menu);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`;

    return (
        <View style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
          </View>
          <Image source={{ uri: imageUrl }} style={styles.menuItemImage} />
        </View>
      );
    };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./images/logo.png')} style={styles.logo} />

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('./images/Profile1.png')} style={styles.avatar} />
        </TouchableOpacity>

      </View>
      <View style={[styles.hero, styles.center]}>
        <View style={[styles.heroContent, styles.center]}>
          <Text style={styles.mainTextHeader}>Little Lemon</Text>
          <Text style={styles.subText}>Chicago</Text>
          <Text style={styles.bodyText}>
          We are a family owned mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <Image source={require('./images/search.jpg')} style={styles.searchIcon} />
        </View>
        <Image source={require('./images/hero1.png')} style={styles.heroImage} />
      </View>

      <View style={styles.menu}>
  <View style={styles.orderSection}>
    <Text style={styles.orderHeaderText}>ORDER FOR DELIVERY!</Text>
    <View style={styles.categoryButtons}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Desserts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Drinks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Launch</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    <View style={styles.divider}></View>
</View>

      <View style={styles.menuItems}>
        <FlatList
      data={menuItems}
      keyExtractor={item => item.name}
      renderItem={({ item }) => (
        <View style={styles.menuItemContainer}>
          <Image
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
            style={styles.menuItemImage}
          />
          <View style={styles.menuItemTextContainer}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
    />

      </View>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F4F7',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    logo: {
      width: 200,
      height: 50,
      marginLeft: 100,
      resizeMode: 'contain',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginLeft: 45,
    },
    menu: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    menuItem: {
    flexDirection: 'row',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    menuItemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    menuItemDescription: {
      fontSize: 14,
      color: '#888',
    },
    hero: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#495E57',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroContent: {
      flex: 1,
      paddingHorizontal: 20,
    },
    mainTextHeader: {
      fontSize: 33,
      fontWeight: 'bold',
      color: '#F4CE14',
    },
    subText: {
      fontSize: 20,
      color: 'white',
      marginBottom: 20,
      marginRight: 110,
    },
    bodyText: {
      fontSize: 17,
      color: 'white',
      marginBottom: 20,
      marginLeft: 5,
      textAlign: 'left',
      fontStyle: 'italic',
    },
    searchIcon: {
      width: 20,
      height: 20,
      backgroundColor: 'F2F4F7',
      padding: 15,
      borderRadius: 50,
      marginRight: 136,
      marginBottom: 19,
    },
    heroImage: {
      width: '40%',
      height: '60%',
      resizeMode: 'cover',
      borderRadius: 10,
      marginRight: 15,
    },



    orderSection: {
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      orderHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
      },
      categoryButtons: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      categoryButton: {
        backgroundColor: 'silver',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
      },
      categoryText: {
        color: 'grey',
        fontSize: 16,
      },
      divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginBottom: 10,
        width: '100%',
      },



      menuItems:{
        paddingRight: 10,
      },

      menuItemImage: {
        width: '30%',
        height: '90%',
        resizeMode: 'cover',
        borderRadius: 7,
        marginRight: 10,
      },
      
      menuItemContainer: {
        flexDirection: 'row',
      },

      menuItemTextContainer: {
        marginLeft: 8,
        marginRight: 30,

      },

      menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 2,
      },

      menuItemDescription: {
        fontSize: 13,
        color: 'grey',
        marginBottom: 5
      },

      menuItemPrice: {
        fontSize: 17,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 5
      },
  });

export default Home;
