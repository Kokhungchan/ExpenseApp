import React from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, { eq, interpolate } from "react-native-reanimated";

import { withTransition } from "react-native-redash";
import theme, { Box, Text } from "../../components/theme";
import { Delete } from "../Svgs";

import { Icon } from 'react-native-elements'

const Expense = ({ index, transition, onTap, onDelete, item, categories }) => {
  const isActive = eq(transition, index);
  const activeTransition = withTransition(isActive, { duration: 200 });

  const delX = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [-100, 20],
  });

  const hidePrice = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          onTap();
        }}
      >
        <Animated.View>
          <Box
            overflow="hidden"
            paddingHorizontal="l"
            borderBottomWidth={0}
            borderBottomColor="silver"
            height={80}
            position="relative"
            style={{
              borderBottomLeftRadius: 10
            }}
          >
            <View style={[StyleSheet.absoluteFill, {flexDirection: "row", justifyContent:'space-between'}]}>
              <Animated.View      
                  style={{
                  width:'15%',
                  flexDirection: "row",
                  alignItems: "center",
                  height: 80,
                  padding: 10,
                }}>
              {categories.map((icon) => 
                  item.category == icon.category ? (
                    <Icon
                    raised
                    key={icon}
                    name={icon.name}
                    type={icon.type}
                    color={icon.color}
                    size={20}
                    >
                    </Icon>
                  ):(null)
                )}
              </Animated.View>
              <Animated.View
                style={{
                  justifyContent: "space-between",
                  width:'81%',
                  flexDirection: "row",
                  alignItems: "center",
                  height: 80,
                  padding: 15,
                }}
              >
                <Box style={{
                  flexDirection:'column',
                  alignItems:'flex-start',

                }}>
                  <Animated.Text style={{color: '#113D6B', fontWeight: '600', marginBottom: 4, fontSize: 16}}>{item.category}</Animated.Text> 
                  <Animated.Text style={{color: '#64819F', fontSize: 12}}>{item.title}</Animated.Text>  
                </Box>
                     
                <Animated.Text
                  style={{
                    opacity: hidePrice,
                    fontWeight: '700',
                    color: item.price > 0 ? "#34B27C" : "#FF4500",
                  }}
                >
                  {item.price > 0
                    ? `MYR${item.price}`
                    : `- MYR${Math.abs(item.price)}`}
                </Animated.Text>
              </Animated.View>
            </View>

            <Animated.View
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "900",
                position: "absolute",
                height: 79,
                width: "14%",
                right: delX,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Text>
                <TouchableOpacity
                  onPress={() => 
                    {
                    onDelete(index);
                  }}
                >
                  <Delete />
                </TouchableOpacity>
              </Text>
            </Animated.View>
          </Box>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default Expense;
