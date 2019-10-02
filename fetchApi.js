import React, { Component } from 'react';
import { View, Text,FlatList,ActivityIndicator,StyleSheet,TouchableOpacity,Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    function shuffle(arra1) {
      var ctr = arra1.length, temp, index;
  
  // While there are elements in the array
      while (ctr > 0) {
  // Pick a random index
          index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
          ctr--;
  // And swap the last element with it
          temp = arra1[ctr];
          arra1[ctr] = arra1[index];
          arra1[index] = temp;
      }
      return arra1;
  }

   // fetch("https://raw.githubusercontent.com/emonno13/jsontest/master/getOrders.json")
    fetch("https://raw.githubusercontent.com/emonno13/jsontest/master/getCategory.json")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: shuffle(responseJson).slice(0,2)
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }



  render() {
    if (this.state.loading) {
      return (
        <View >
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }


    return (
      <View>
        <FlatList
          numColumns={2}
          data={this.state.dataSource}
          renderItem={({item}) => 
          // <TouchableOpacity style={styles.main}>
          //   <Text>OrderID :  {item.order_id}</Text>
          //   <Text>Time :  {item.time}</Text>
          //   <Image
          //     source={{uri: item.img}}
          //     style = {{ width: 200, height: 200, marginVertical:5,marginHorizontal:5 }}
          //   />
          // </TouchableOpacity>
            <TouchableOpacity style={styles.main}>
              <Image
                source={{ uri: item.belong_cate_lvl1_image }}
                style={{ width: 200, height: 200, marginVertical: 5, marginHorizontal: 5 }}
              />
              <Text>{item.belong_cate_lvl1_name}</Text>
            </TouchableOpacity>
        }
          keyExtractor={(item,index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth : 5
  }

})
