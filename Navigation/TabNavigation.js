import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import Profile from '../screen/Components/Profile/Profile';
import AI from '../screen/Components/AI/Al';
import Home from '../screen/Components/Home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);


const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={[styles.tabBar, { paddingBottom: bottom }]}>
            <Svg
                width={110}
                height={60}
                viewBox="0 0 110 60"
                style={[styles.activeBackground]}
            >
                <Path
                    fill="#604AE6"
                    d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                />
            </Svg>

            <View style={styles.tabBarContainer}>
                {routes.map((route, index) => {
                    const active = index === activeIndex;
                    const { options } = descriptors[route.key];

                    return (
                        <View key={route?.key} style={{ width: 60, height: 60, backgroundColor: "#FFFFFF00" }} />
                    );
                })}
            </View>
        </View>
    );
}

const TabNavigation = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <NavigationContainer>
                <Tab.Navigator
                    tabBar={(props) => <AnimatedTabBar {...props} />}
                >
                    <Tab.Screen
                        name="Home"
                        options={{
                            tabBarIcon: ({ ref }) => <LottieView ref={ref} loop={false} source={require('../assets/lottie/home.icon.json')} style={styles.icon} />,
                        }}
                        component={Home}
                    />
                    <Tab.Screen
                        name="Chat"
                        options={{
                            tabBarIcon: ({ ref }) => <LottieView ref={ref} loop={false} source={require('../assets/lottie/chat.icon.json')} style={styles.icon} />,
                        }}
                        component={AI}
                    />
                    <Tab.Screen
                        name="Settings"
                        options={{
                            tabBarIcon: ({ ref }) => <LottieView ref={ref} loop={false} source={require('../assets/lottie/settings.icon.json')} style={styles.icon} />,
                        }}
                        component={Profile}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}







const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
    },
    activeBackground: {
        position: 'absolute',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -5,
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 36,
        width: 36,
    }
});

export default TabNavigation;
