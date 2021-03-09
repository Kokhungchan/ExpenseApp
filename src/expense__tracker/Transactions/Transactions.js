import React, { useRef, useState } from "react";
import { ImageBackground, SectionList, View, StyleSheet, Alert, TextInput, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker"
import moment from "moment";
import Animated from "react-native-reanimated";
import { useValue, withTransition } from "react-native-redash";
import theme, { Box, Text } from "../../components/theme";
import { Chart, AddIcon, Delete } from "../Svgs";
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from 'react-native-elements'

export const moneySign = "MYR";

/* Add Transaction Component */
import Expense from "./Expense";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../../store/actions/transactionActions";
import Top from "./Top";
import { addTransaction } from "../../../store/actions/transactionActions";
import { render } from "react-dom";
import { categories } from "./Category"; 

const Transactions = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const titleRef = useRef(null);
  const sheetRef = useRef(null);
  const categorySheetRef = useRef(null);
  const active = new Animated.Value(0);
  const transition = withTransition(active, { duration: 200 });
  const { transactions } = useSelector((state) => state.trs);

  const onNavigate = () => {
    navigate("AddTransaction");
  };
  const closeSheet = () => {
    sheetRef.current.snapTo(2)
  }
  const closeCategorySheet = () => {
    categorySheetRef.current.snapTo(1)
  }
  const openCategorySheet = () => {
    Keyboard.dismiss();
    categorySheetRef.current.snapTo(0);
  }
  const expandKeyboard = () => {
    sheetRef.current.snapTo(0)
  }
  const onPop = () => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };

  const submitCategory = (id) => {
    switch (id) {
      case 0:
        setCategory('Healthcare')
        break;
      case 1: 
        setCategory('Car')
        break;
      case 2: 
        setCategory('Food & Drink')
        break;
      case 3: 
        setCategory('Travel')
        break;
      case 4: 
        setCategory('Home')
        break;
      case 5: 
        setCategory('Entertainment')
        break;
      case 6: 
        setCategory('Transport')
        break;
      case 7: 
        setCategory('Groceries')
        break;
      case 8: 
        setCategory('Gifts')
        break;
      case 9: 
        setCategory('Others')
        break;
      default: 
        setCategory("");
        break;
    }
    closeCategorySheet();
  }

  const onSubmit = () => {
    const transaction = {
      price,
      title,
      category
    };

    if (!price || !title || !category) return alert("Details Empty");

    dispatch(addTransaction(transaction));
    setPrice("");
    setTitle("");
    setCategory("");
    closeSheet();
    Keyboard.dismiss();
  };

  const renderCategoryContent = () => (
    <View
    style={{
      backgroundColor: '#f0f4f5',
      padding: 20,
      height: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}
  >
      <Text
        style={{
        fontWeight: '700',
        color: 'gray',
        fontSize: 16
      }}>Select a category</Text>
      <Box flexDirection="row" marginTop="s" flexWrap="wrap">
      {categories.map((item, index) => (
      <View key={index} style={{paddingBottom: 15}}>
      <Icon
      reverse
      name={item.name}
      type={item.type}
      color={item.color}
      value={item.value}
      onPress={() => submitCategory(index)} />
      <Text style={{fontSize: 8, textAlign:'center', marginTop: 3}}>
        {item.category}
      </Text>
      </View>
      ))
      }
        </Box>
  </View>
  );

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        height: "100%",
      }}
    >
      <Box flexDirection="row" flexDirection="column" marginTop="s">
        <Text
          style={{
            fontWeight: '700',
            color: 'gray',
            fontSize: 16
          }}>Amount</Text>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          borderBottomWidth={2}
          paddingBottom="m"
          marginTop="m"
        >
          <TextInput
            placeholderTextColor={theme.colors.primary}
            keyboardType="numbers-and-punctuation"
            style={{
              padding: 10,
              fontSize: 30,
              fontFamily: "SFBOLD",
              width: "70%",
            }}
            onChangeText={(price) => setPrice(price)}
            onFocus={expandKeyboard}
            onSubmitEditing={() => titleRef.current.focus()}
            defaultValue={price}
          />
          <Text 
            style={{
              fontWeight: '700',
              color: "gray",
              
            }}>MYR</Text>
        </Box>

        <Box marginTop="xl" borderBottomWidth={2}>
          <Text       
          style={{
            fontWeight: '700',
            color: 'gray',
            fontSize: 16,
          }}>
            Expenses made for
          </Text>
          <TextInput
            ref={titleRef}
            placeholderTextColor={theme.colors.primary}
            defaultValue={title}
            onFocus={expandKeyboard}
            style={{
              fontSize: 25,
              fontFamily: "SFBOLD",
              width: "80%",
              marginTop: 20
            }}
            onChangeText={(title) => setTitle(title)}
          />
        </Box>
        <Box marginTop="xl">
          <Text       
          style={{
            fontWeight: '700',
            color: 'gray',
            fontSize: 16,
          }}>
            Category: {category}
          </Text>
          <TouchableOpacity onPress={openCategorySheet}>
            <Box
              borderRadius="l"
              height={55}
              marginTop='m'
              backgroundColor="gray"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="title1" style={{color: 'gray'}}>Select Category</Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box marginTop="xl">
          <TouchableOpacity onPress={onSubmit}>
            <Box
              borderRadius="l"
              height={55}
              backgroundColor="primary"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="title1">Submit</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </View>
  );
  const renderBottomHeader = () => (
    <View
      style={{
        shadowColor: "#333333",
        backgroundColor: "#ffffff",
        shadowOffset: {width: -1, height:-3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }}>
      <View 
        style={{
          alignItems: 'center'
        }}>
        <View 
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10
        }}/>
      </View>
    </View>
  );

  const renderCatBottomHeader = () => (
    <View
      style={{
        shadowColor: "#333333",
       
        shadowOffset: {width: -1, height:-3},
        
        shadowOpacity: 0.4,
        paddingTop: 20,

      }}>
      <View 
        style={{
          alignItems: 'center'
        }}>
        <View 
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10
        }}/>
      </View>
    </View>
  );

  const onDelete = (id) => {
    Alert.alert(
      "Delete Transaction?",
      "Your transactions will be lost if you confirm.",[
        {
          text: "Yes, delete transaction",
          onPress: () => dispatch(deleteTransaction(id)),
        },
        {
          text: "Cancel",
          onPress: () => console.log("No, continue editing"),
          style: "cancel"
        }
      ]
    ),
    { cancelable: false }
  };

  const DATA = Object.values(
    transactions.reduce((acc, item) => {
      if (!acc[item.addedtime])
        acc[item.addedtime] = {
          title: item.addedtime,
          data: [],
          price: item.price,
        };
      acc[item.addedtime].data.push(item);
      return acc;
    }, {})
  );

  /* Price calculations */
  const allDates = transactions
    .map(({ addedtime }) => addedtime)
    .filter(function (value, index, array) {
      return array.indexOf(value) == index;
    });

  const MonthExpense =({ monthly, yearly }) => {
    const expense = transactions
      .filter(({ month, year }) => month == monthly && year == yearly)
      .map(({ price }) => {
        return price;
      });
      const sum = eval(expense.join("+"));

      return (
        <Text color="silver1" fontSize={16} fontWeight="700">{sum > 0 ? `RM${sum}` : `- RM${Math.abs(sum)}`}</Text>
      );
  }

  const Prices = ({ time }) => {
    const prices = transactions
      .filter(({ addedtime }) => addedtime == time)
      .map(({ price }) => {
        return price;
      });
    const sum = eval(prices.join("+"));

    return (
      <Text 
        color="silver1">
          {sum > 0 ? `MYR${sum}` : `- MYR${Math.abs(sum)}`}</Text>
    );
  };

  const renderHeader = ({ section: { data } }) => {
    return (
      <Box
        paddingHorizontal="m"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="silver"
        paddingBottom="s"
        paddingTop="s"
        marginTop="m"
        borderTopRightRadius="m"
        borderTopLeftRadius="m"
      >
        <Text color="silver1">
          {moment(data[0].addedtime, "x").format("DD MMM YYYY")}
        </Text>
        <Prices time={data[0].addedtime} />
      </Box>
    );
  };

  const renderFooter = ({ section: { data } }) => {
    return (
      <Box
        paddingHorizontal="m"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="silver"
        paddingBottom="s"
        paddingTop="s"
        borderBottomRightRadius="m"
        borderBottomLeftRadius="m"
      >
      <Text 
        color="silver1"
        fontSize={16}>
          Total this month ({moment(data[0].addedtime, "x").format("MMM")})
      </Text>
       <MonthExpense monthly={data[0].month} yearly={data[0].year}/>
      </Box>
    );
  };

  return (
    <ImageBackground 
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "flex-end",
        position: "relative",
      }}>
      <View
        style={{
        height: "28%",
        position: "absolute",
        top: 0,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
      }}
      >
        <LinearGradient
          colors={['#395e7e','#315472','#2a4a66','#22405a','#1b374f']}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Top />
   
      <Box
        flex={1}
        paddingLeft="l"
        paddingRight="l"
        paddingBottom="m"
        paddingTop="m"
      >
        <SectionList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const index = item.id;

            return (
              <Animated.View
                style={{ borderRadius: 20, height:51 }}
              >
                <Box
                  overflow="hidden"
                  borderBottomWidth={1}
                  borderBottomColor="silver"
                  height={50}
                  position="relative"
                  backgroundColor="white"
                >
                  <Animated.View
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontWeight: "900",
                      position: "absolute",
                      height: 50,
                      width: "14%",
                      right: -20,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <Text >
                      <Delete />
                    </Text>
                  </Animated.View>
                  <Animated.View style={{ backgroundColor: "white" }}>
                    <Expense
                      onTap={() => {
                        active.setValue(index);
                      }}
                      {...{ transition, index, onDelete, item, allDates, categories}}
                    >
                      <Box
                        overflow="hidden"
                        paddingHorizontal="m"
                        borderBottomWidth={1}
                        borderBottomColor="silver"
                        height={50}
                        position="relative"
                        backgroundColor="white"
                      >
                        <View style={[StyleSheet.absoluteFill, {}]}>
                          <Animated.View
                            style={{
                              justifyContent: "space-between",
                              flexDirection: "row",
                              alignItems: "center",
                              height: 50,
                              paddingHorizontal: theme.spacing.m,
                            }}
                          ></Animated.View>
                        </View>
                      </Box>
                    </Expense>
                  </Animated.View>
                </Box>
              </Animated.View>
            );    
          }}
          renderSectionHeader={renderHeader}
          renderSectionFooter={renderFooter}
          sections={DATA}
        />
      </Box>
      <Box style={{ position: "absolute", right: 20, bottom: 50, zIndex: 4 }}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
          <AddIcon />
        </TouchableOpacity>
      </Box>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[770, 500, 0]}
        initialSnap={2}
        enabledGestureInteraction={true}
        renderHeader={renderBottomHeader}
        enabledContentGestureInteraction={false}
        renderContent={renderContent}
      />
      <BottomSheet
        ref={categorySheetRef}
        snapPoints={[565, 0]}
        initialSnap={1}
        enabledGestureInteraction={true}
        renderHeader={renderCatBottomHeader}
        enabledContentGestureInteraction={false}
        renderContent={renderCategoryContent}
      />
    </ImageBackground>
  );
};

export default Transactions;
