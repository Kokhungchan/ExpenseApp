import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* Components */
import Onboarding from "./Onboarding/Onboarding";
import Transactions from "./Transactions/Transactions";
import Stats from "./Transactions/Stats";

export const assets = [];

const ExpenseStack = createStackNavigator();

export const ExpenseNavigator = () => (
  <ExpenseStack.Navigator headerMode="none" initialRouteName="Transactions">
    <ExpenseStack.Screen name="ExpenseOnboarding" component={Onboarding} />
    <ExpenseStack.Screen name="Transactions" component={Transactions} />
    <ExpenseStack.Screen name="Stats" component={Stats} />
  </ExpenseStack.Navigator>
);
