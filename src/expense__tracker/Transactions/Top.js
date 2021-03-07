import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text } from "../../components/theme";
import { Chart } from "../Svgs";
import moment from "moment";

const Top = () => {
  const dispatch = useDispatch();
  let monthNumber = (new Date().getMonth());
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthName = monthNames[monthNumber];
  const { transactions } = useSelector((state) => state.trs);

  const prices = transactions.map((transaction) => transaction.price);
  const balance = prices.reduce((prev, cur) => (prev += cur), 0);
  const expense =
    prices
      .filter((price) => price < 0)
      .reduce((prev, cur) => (prev += cur), 0) * -1;
  const income = expense + balance;

  return (
    <Box paddingLeft="l" paddingRight="l" style={{ paddingTop: 40 }}>
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="title" style={{ fontSize: 45, fontFamily: "RMedium" }}>
          {monthName}
        </Text>
        {/* <Chart /> */}
      </Box>
      <Box justifyContent="space-between" marginTop="m">
      <Text     
            textAlign="center"
            fontWeight="500"
            fontSize={13}
            paddingBottom="s"
            color="green1">Available Savings</Text>
          <Text
            textAlign="center"
            fontFamily="SFSEMI"
            fontSize={30}
            color="white"
            >MYR {' '}{balance}</Text>
      </Box>
      <Box 
        flexDirection='row'
        justifyContent="center" 
        marginTop="m" 
        width="80%" 
        backgroundColor='white' 
        alignSelf='center'
        style={{ 
          borderRadius: 5, 
          padding: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, }}>
        <Box borderRightColor="white" borderRightWidth="1" width='50%'>
          <Text
            textAlign="center"
            fontFamily="RRegular"
            variant="body"
            color="silver1"
            fontSize={14}
          >
            Expenses
          </Text>
          <Text
            textAlign="center"
            textAlign="center"
            fontSize={16}
            color="red"
            fontWeight="600"
            fontFamily="SFSEMI"
          >
             MYR{' '}{expense}
          </Text>
        </Box>
        <Box borderLeftColor="gray" borderLeftWidth="1" width='50%'>
          <Text
            textAlign="center"
            fontFamily="RRegular"
            variant="body"
            color="silver1"
            fontSize={14}
          >
            Income
          </Text>
          <Text
            textAlign="center"
            fontFamily="SFSEMI"
            textAlign="center"
            fontSize={16}
            color="green"
            fontWeight="600"
          >
            MYR{' '}{income}
          </Text>
        </Box>
      </Box>
        {/* <Box 
          width='60%'
          flexDirection='row'>
          
          <Text 
            fontSize={11}>Your saving increase 10% than last month</Text>
        </Box> */}
      
    </Box>
  );
};

export default Top;