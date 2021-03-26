import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, ImageBackground } from "react-native";
import {
  BorderlessButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory-native";
import theme, { Box, Text } from "../../components/theme";
import { BackArrow, MoneyIcon } from "../Svgs";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { categories } from "./Category"; 
import { LinearGradient } from 'expo-linear-gradient'
import { Ebg1 } from "../../../assets/images";

/* Dimension */
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 3,
    paddingTop: 40,
    padding: theme.spacing.l,
    bottom: 0,
  },
});

const Stats = ({ navigation }) => {
    useEffect(() => {
        if(transactions.length > 0){
          calcExpenses();
          calcCategories();
         
;        } else {
            console.log('No transaction!')
        }
    })
  const dispatch = useDispatch();
  var sumOfIncome;
  const { navigate } = navigation;
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [catHealth, setCatHealth] = useState("");
  const [catCar, setCatCar] = useState("");
  const [catFood, setCatFood] = useState("");
  const [catTravel, setCatTravel] = useState("");
  const [catHome, setCatHome] = useState("");
  const [catEnt, setCatEnt] = useState("");
  const [catTrans, setCatTrans] = useState("");
  const [catGro, setCatGro] = useState("");
  const [catGifts, setCatGifts] = useState("");
  const [catOther, setCatOther] = useState("");
  const [entries, setEntries] = useState("");
  const [activeSlide, setActiveSlide] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [highestIncome, setHighestIncome] = useState(0);
  const titleRef = useRef(null);
  const { transactions } = useSelector((state) => state.trs);
  const onPop = () => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };
  const prices = transactions.map((transaction) => transaction.price);
  const balance = prices.reduce((prev, cur) => (prev += cur), 0);
  const formatBalance = parseInt(balance.toString().replace(/,/g, '')).toLocaleString();

  const data = 
    [
        {
            title1: income,
            title2: expense,
            isPage: 'expense'
        },
        {
            title1: income,
            title2: expense,
            isPage: 'category'
        },
    ]
  
  const renderItem = (item, index) => {
      return (
        transactions.length > 0 ? (
            <View>
                {item.item.isPage == 'expense' ? (
                <View>
                <VictoryPie 
                    width={300}
                    height={300}
                    innerRadius={130}
                    colorScale={["#315472", "tomato", "cyan", "" ]}
                    padAngle={2}
                    cornerRadius={5}
                    data={[
                        { x: ' ', y: income},
                        { x: ' ', y: expense}
                    ]}/>
                    
                    <Box style={{
                        position: 'absolute',
                        top: 130,
                        left:'30%',
                        justifyContent:'center',
                        flexDirection: 'column'
                    }}>
                        <View 
                            style={{
                            flexDirection:'row',
                            justifyContent:'space-around'
                        }}>
                            <Box style={{
                                backgroundColor: '#315472',
                                width: 10,
                                height: 10,
                                borderRadius: 2,
                                alignSelf: 'center'
                            }}/>
                            <Text style={{           
                            color: '#2E5976',
                            textAlign: 'center',
                            fontWeight: '600'
                            }}> Income: {item.item.title1} </Text>
                        </View>
                        <View 
                            style={{flexDirection:'row',
                            justifyContent:'space-around'}}>
                            <Box style={{
                                backgroundColor: 'tomato',
                                width: 10,
                                height: 10,
                                borderRadius: 2,
                                alignSelf: 'center'
                            }}/>
                            <Text style={{
                            color: '#2E5976',
                            textAlign: 'center'
                            }}> Expense: {item.item.title2} </Text>
                        </View> 
                    </Box>
                    </View>
                ) : item.item.isPage == 'category' ? (
                    <View>
                        <VictoryPie 
                            width={250}
                            height={250}
                            origin={{ x: 150, y: 110}}
                            innerRadius={90}
                            colorScale={["#f50", "#57E7F6", "#5036B9", "#21778F" ,"#78435F", "#651508", "#B77167", "#466DE7", "#359f79", "#96AEB4" ]}
                            padAngle={2}
                            cornerRadius={5}
                            labels={({ datum }) => (datum.y === 0 ? "" : datum.y)}
                            labelComponent={  <VictoryLabel
                                style={{
                                  fill: '#2E5976',
                                  fontWeight: 600
                                }}
                              />}
                            data={[
                                { x: ' ', y: catHealth },
                                { x: ' ', y: catCar },
                                { x: ' ', y: catFood },
                                { x: ' ', y: catTravel },
                                { x: ' ', y: catHome },
                                { x: ' ', y: catEnt },
                                { x: ' ', y: catTrans },
                                { x: ' ', y: catGro },
                                { x: ' ', y: catGifts },
                                { x: ' ', y: catOther }
                            ]}/>
                            <Box style={{
                                position: 'absolute',
                                top: 211,
                                maxHeight: 80,
                                overflow: 'visible',
                                padding: 5,
                                justifyContent:'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}>
                                {categories.map((item, index) => (
                                <View key={index} flexDirection='row' style={{padding: 8}}>
                                    <Box style={{
                                        backgroundColor: item.color,
                                        width: 10,
                                        height: 10,
                                        borderRadius: 2,
                                        alignSelf: 'center',
                                        marginRight: 5,
                                        marginTop: 3
                                    }}/>
                                    <Text style={{fontSize: 10, textAlign:'center', marginTop: 3}}>
                                        {item.category}
                                    </Text>
                                </View>
                                ))
                                }   
                        </Box>    
                    </View>
                ): (null)}
            </View>
            ) : (
            <View style={{
                justifyContent: 'center',
                marginTop: 25
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: "700",
                    color: 'gray'
                }}>
                    No Transaction
                </Text>   
            </View>
        )
      );
  }
  const calcCategories = () =>{
      //calculate category stats (hardcode to find each category for now)
      //health
      var health = transactions.filter((item) => item.category == 'Healthcare')
      var sumOfHealth = health.length
      setCatHealth(sumOfHealth)

      var car = transactions.filter((item) => item.category == 'Car')
      var sumOfCar = car.length
      setCatCar(sumOfCar)

      var food = transactions.filter((item) => item.category == 'Food & Drink')
      var sumOfFood = food.length
      setCatFood(sumOfFood)
      
      var travel = transactions.filter((item) => item.category == 'Travel')
      var sumOfTravel = travel.length
      setCatTravel(sumOfTravel)

      var home = transactions.filter((item) => item.category == 'Home')
      var sumOfHome = home.length
      setCatHome(sumOfHome)

      var ent = transactions.filter((item) => item.category == 'Entertainment')
      var sumOfEnt = ent.length
      setCatEnt(sumOfEnt)

      var trans = transactions.filter((item) => item.category == 'Transport')
      var sumOfTrans = trans.length
      setCatTrans(sumOfTrans)

      var gro = transactions.filter((item) => item.category == 'Groceries')
      var sumOfGro = gro.length
      setCatGro(sumOfGro)

      var gifts = transactions.filter((item) => item.category == 'Gifts')
      var sumOfGifts = gifts.length
      setCatGifts(sumOfGifts)

      var other = transactions.filter((item) => item.category == 'Other')
      var sumOfOther = other.length
      setCatOther(sumOfOther)
  }

  const calcExpenses = () => {
      var income = transactions.filter((item) => item.price > 0)
      var sumOfIncome = income.reduce((accumulator, current) => accumulator + current.price, 0)
      var highestIncome = income.reduce((prev, current) => (prev.y > current.y) ? prev : current)

      setHighestIncome (highestIncome)
      setIncome(sumOfIncome)
      var expense = transactions.filter((item) => item.price < 0)
      var sumOfExpense = expense.reduce((accumulator, current) => accumulator + current.price, 0)
      setExpense(Math.abs(sumOfExpense))
  }

  return (
    <Box flex={1}>
        <View
            style={{
            height: "28%",
            position: "absolute",
            top: 0,
            width: '100%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            overflow: 'hidden',
        }}
        >
        <ImageBackground       
          source={Ebg1}
          resizeMode="cover"
          style={{
            flex: 1,
            height: "350%"
          }}></ImageBackground>
      </View>
      <Box padding="l">
        <Box flexDirection="row" alignItems="center" paddingTop="l">
            <TouchableOpacity onPress={onPop}>
            <Box>
                <BackArrow />
            </Box>
            </TouchableOpacity>
            <Text
            variant="title1"
            color="white"
            style={{ marginLeft: 30, fontSize: 18 }}
            >
            Overview
            </Text>
        </Box>
        <Box justifyContent="space-between" marginTop="l">
            <Text     
                textAlign="center"
                fontWeight="500"
                fontSize={13}
                paddingBottom="s"
                color="green1">Available Savings
            </Text>
            <Text
                textAlign="center"
                fontFamily="SFSEMI"
                fontSize={30}
                color="white"
                >MYR {' '}{formatBalance}
            </Text>
        </Box>
        <Box flexDirection="column" marginTop="xl">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            backgroundColor: '#F9FAFC',
                borderRadius: 15,
                marginTop: -20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
          }}
        >
            <Carousel
                layout={"default"}
                data={data}
                sliderWidth={330}
                itemWidth={300}
                loop={true}
                renderItem={renderItem}
                onSnapToItem = { index => setActiveIndex(index)} />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={activeIndex}
                    containerStyle={{ backgroundColor: 'rgba(249, 250, 252, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)'
                    }}
  
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    />
        </Box>
        <Box  marginTop='m'           
                style={{
                borderRadius: 15,
                shadowColor: "#8BC6EC",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.8,
                shadowRadius: 10.84,
                elevation: 10
            }}>
          <LinearGradient
            justifyContent="center"
            alignItems="center"
            colors={['#30cfd0', '#9599E2']}
            start={[0,1]}
            end={[1,0]}
            style={{
                padding: 15,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
            }}
            >
                <Box style={{
                    position: 'absolute',
                    opacity: 0.21,
                    top: 40,
                    left: -20
                }}>
                    <MoneyIcon />
                </Box>
                <Box style={{
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Text style={{
                        fontWeight: '700',
                        color: 'white',
                        fontSize: 16,
                        textAlign: 'center'
                    }}>Highest Income</Text>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#315472',
                        marginTop: 5
                    }}>
                        {highestIncome.title}
                    </Text>
                    <Box style={{
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: '900',
                            color: 'white'
                        }}>
                            RM {highestIncome.price}
                        </Text>
                    </Box>
                </Box>    
            </LinearGradient>   
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Stats;
