import { StatusBar, Text, View,} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/AntDesign';

import Explore from './Components/Screens/Explore';
import WishList from './Components/Screens/WishList';
import Inbox from './Components/Screens/Inbox';
import Profile from './Components/Screens/Profile';
import MyOrder from './Components/Screens/MyOrder';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabItems = [
  { name: 'Home', component: Explore, icon: 'search1' },
  { name: 'WishList', component: WishList, icon: 'hearto' },
  { name: 'My Orders', component: MyOrder, icon: 'shoppingcart'},
  { name: 'Inbox', component: Inbox, icon: 'message1' },
  { name: 'Profile', component: Profile, icon: 'user'},
];

const TabNavigator = () => {

  return (<>
    <BottomSheetModalProvider>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
      <Tab.Navigator initialRouteName='Home' screenOptions={{tabBarShowLabel: false,headerShown: false, tabBarStyle: { height: 56,  elevation:10, statusBarTranslucent: true, borderColor:'#f2f2f2'}}}>
        {tabItems.map((item) => <Tab.Screen key={item.name} name={item.name} component={item.component} options={{tabBarIcon: ({ focused }) =>
          <View style={{backgroundColor: 'transparent',flex: 1,justifyContent: 'center',alignItems: 'center'}} >
            <Icon name={item.icon} size={24} color={focused?'#f97315':'#727272'} />
            <Text style={{paddingTop:3, color: focused? "#f97315":'#727272', fontFamily: focused?'Roboto-Bold' : 'Roboto-Medium', fontSize: 10.5}}>{item.name}</Text>
          </View>
        }}/>)}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  </>);
};

const Navigation = () => {
  return (<>
    <Stack.Navigator initialRouteName='Onboarding' screenOptions={{orientation:'portrait',headerShown:false,animation:'simple_push', animationDuration:100, statusBarTranslucent: true}} >
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      {/* <Stack.Screen name='Login' component={Login} options={{ animation:'slide_from_bottom'}}/> */}
      {/* <Stack.Screen name='SignUp' component={SignUp} options={{animation:'simple_push'}}/> */}

      {/* <Stack.Screen name='ListingDetail' component={ListingDetail} options={{ animation:'simple_push'}}/> */}
    </Stack.Navigator>
    </>
  )
}

export default Navigation;