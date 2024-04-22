// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Pressable,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import navigationString from "../constant/navigationString";
// import { useTheme } from "react-native-paper";
// import AccountRoutes from "./sub-routes/accountRoutes";
// import HomeRoutes from "./sub-routes/homeRoutes";
// import { OneSignal } from "react-native-onesignal";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../redux/user/user.selector";
// import { useQuery } from "react-query";
// import agent from "../../api/agent";
// import { Toast } from "react-native-toast-notifications";
// import { toastSetting } from "../core/alertSettings";
// import { handleLogoutOnError } from "../features/logoutSession";
// import SurveyModal from "../modal/surveyModal";
// import { useAppState } from "../core/appStateHandle";
// import Svg, { Path, G, Defs } from "react-native-svg";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const HomeTab = createBottomTabNavigator();

// const AnimatedTabBar = ({
//   state: { index: activeIndex, routes },
//   navigation,
//   descriptors,
// }) => {
//   const theme = useTheme();
//   const { bottom } = useSafeAreaInsets();
//   const ref = useRef(null);

//   const screenWidth = Dimensions.get("window").width;
//   const svgHeight = 124 * (screenWidth / 428); // Calculate the height based on the aspect ratio
//   const tabStyle = styles(theme.colors);
//   const shadow = {
//     position: "absolute",
//     width: screenWidth,
//     height: svgHeight,
//     shadowColor: theme.colors.fontPrime,
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5, // Android elevation
//     bottom: -40,
//   };
//   return (
//     <View style={[tabStyle.tabBar, { paddingBottom: bottom }]}>
//       <View style={shadow}>
//         <Svg
//           width={screenWidth}
//           height={svgHeight}
//           viewBox="0 0 428 124"
//           fill="none"
//         >
//           <Path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M260.212 48.3011C267.635 37.4547 274.105 28 285 28H428V124H0V28H139C148.902 28 155.201 37.0582 162.541 47.6134C172.788 62.3481 185.063 80 212 80C238.519 80 250.227 62.8914 260.212 48.3011Z"
//             fill={theme.colors.background}
//           />
//         </Svg>
//       </View>

//       <View style={tabStyle.tabBarContainer}>
//         {routes.map((route, index) => {
//           const active = index === activeIndex;
//           const { options } = descriptors[route.key];

//           return (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               key={index}
//               onPress={() => {
//                 navigation.navigate(route.name);
//               }}
//               onLayout={() => {}}
//               style={[tabStyle.component, { top: index === 1 ? -20 : 0 }]}
//             >
//               <View
//                 style={[
//                   tabStyle.componentCircle,
//                   {
//                     transform: [
//                       {
//                         scale: 1,
//                       },
//                     ],
//                   },
//                 ]}
//               />
//               <View
//                 style={[
//                   tabStyle.iconContainer,
//                   {
//                     transform: [
//                       {
//                         scale: 1,
//                       },
//                     ],
//                     top: index === 1 ? 0 : Platform.OS === "ios" ? 15 : 0,
//                     left: index === 1 ? -4 : 0,
//                   },
//                 ]}
//               >
//                 <>
//                   {options.tabBarIcon ? (
//                     options.tabBarIcon({ ref, focused: active })
//                   ) : (
//                     <Text>?</Text>
//                   )}
//                   {index !== 1 && options.tabBarLabel
//                     ? options.tabBarLabel({ ref, focused: active })
//                     : null}
//                 </>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };
// const TabRoutes = () => {
//   const theme = useTheme();
//   const navigation = useNavigation();
//   const tabStyle = styles(theme.colors);
//   const isAppActive = useAppState();
//   const [loader, setLoader] = useState(false);
//   const [isNotification, setIsNotification] = useState(false);
//   const [modelShow, setModelShow] = useState(false);
//   const currentUser = useSelector(selectCurrentUser);
//   const token = currentUser?.token;

//   const { refetch } = useQuery(
//     ["check-survey"],
//     () =>
//       agent.Survey.checkSurveyActive(
//         { UserId: currentUser?._id },
//         true,
//         false,
//         token
//       ),
//     {
//       refetchOnWindowFocus: false, //turned off on window focus refetch option
//       enabled: false, // turned off by default, manual refetch is needed
//       onSuccess: (d) => {
//         if (d.Status === "success") {
//           if (d.Active === false) {
//             setModelShow(true);
//           } else if (d.Active === true) {
//             Toast.show(
//               "You have already participated on survey",
//               toastSetting("warning")
//             );
//           }
//         } else {
//           Toast.show(
//             "You have already participated on survey",
//             toastSetting("warning")
//           );
//         }
//       },
//       onError: async (error) => {
//         if (error?.response?.status === 403) {
//           await handleLogoutOnError();
//         }
//       },
//     }
//   );
//   const { refetch: secondRefetch } = useQuery(
//     ["check-survey2"],
//     () =>
//       agent.Survey.checkSurveyActive(
//         { UserId: currentUser?._id },
//         true,
//         false,
//         token
//       ),
//     {
//       refetchOnWindowFocus: false, //turned off on window focus refetch option
//       enabled: false, // turned off by default, manual refetch is needed
//       onSuccess: (d) => {
//         if (d.Status === "success") {
//           if (d.Active === false) {
//             setLoader(false);
//             setModelShow(true);
//           } else if (d.Active === true) {
//             setLoader(false);
//           }
//         } else {
//           // Toast.show(
//           //   "You have already participated on survey",
//           //   toastSetting("warning")
//           // );
//         }
//       },
//       onError: async (error) => {
//         if (error?.response?.status === 403) {
//           await handleLogoutOnError();
//         }
//       },
//     }
//   );
//   OneSignal.Notifications.addEventListener("click", (event) => {
//     if (event?.notification?.additionalData?.page === "survey-notification") {
//       setIsNotification(true);
//       refetch();
//     }
//   });
//   useEffect(() => {
//     if (isAppActive) {
//       setTimeout(() => {
//         secondRefetch();
//       }, 400);
//     }
//   }, [isAppActive]);
//   useEffect(() => {
//     refetch();

//     return () => {};
//   }, []);

//   return (
//     <Fragment>
//       <HomeTab.Navigator
//         tabBar={(props) => <AnimatedTabBar {...props} />}
//         initialRouteName={navigationString.Home}
//         screenOptions={{
//           backBehavior: "history",
//           headerShown: false,
//           tabBarActiveTintColor: theme.colors.primary,
//           tabBarInactiveTintColor: theme.colors.grey,
//           // tabBarShowLabel: false
//           tabBarStyle: {
//             backgroundColor: theme.colors.background,
//             // justifyContent: "center",
//             // alignItems: "center",
//             // paddingTop: 20,
//             // paddingBottom: 5,
//             // height: 50,
//             // borderTopWidth: 0,
//           },
//         }}
//       >
//         <HomeTab.Screen
//           name={navigationString.Home}
//           component={HomeRoutes}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <Image
//                   style={{
//                     tintColor: focused
//                       ? theme.colors.primary
//                       : theme.colors.grey,
//                     width: 20,
//                     height: 20,
//                     objectFit: "contain",
//                   }}
//                   source={require("../../assets/icons/homeActive.png")}
//                 />
//               );
//             },
//             tabBarLabel: ({ focused }) => {
//               return (
//                 <View
//                   style={
//                     focused
//                       ? tabStyle.activeIndicator
//                       : tabStyle.inActiveIndicator
//                   }
//                 ></View>
//               );
//             },
//           }}
//         />
//         <HomeTab.Screen
//           name={navigationString.Home + "1"}
//           component={HomeRoutes}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <Image
//                   style={{
//                     // tintColor: focused
//                     //   ? theme.colors.primary
//                     //   : theme.colors.grey,
//                     width: 80,
//                     height: 80,
//                     objectFit: "contain",
//                   }}
//                   source={require("../../assets/icons/aicenter.png")}
//                 />
//               );
//             },
//             tabBarLabel: ({ focused }) => {
//               return (
//                 <View
//                   style={
//                     focused
//                       ? tabStyle.activeIndicator
//                       : tabStyle.inActiveIndicator
//                   }
//                 ></View>
//               );
//             },
//           }}
//         />
//         <HomeTab.Screen
//           name={navigationString.Account}
//           component={AccountRoutes}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <Image
//                   style={{
//                     tintColor: focused
//                       ? theme.colors.primary
//                       : theme.colors.grey,
//                     width: 20,
//                     height: 20,
//                     objectFit: "contain",
//                   }}
//                   source={require("../../assets/icons/accountActive.png")}
//                 />
//               );
//             },
//             tabBarLabel: ({ focused }) => {
//               return (
//                 <View
//                   style={
//                     focused
//                       ? tabStyle.activeIndicator
//                       : tabStyle.inActiveIndicator
//                   }
//                 ></View>
//               );
//             },
//           }}
//         />
//       </HomeTab.Navigator>
//       <SurveyModal
//         modalShow={modelShow}
//         setModelShow={setModelShow}
//         isFocused={isAppActive}
//         isNotification={isNotification}
//         setIsNotification={setIsNotification}
//       />
//     </Fragment>
//   );
// };
// const styles = (colors) =>
//   StyleSheet.create({
//     activeIndicator: {
//       width: 5,
//       height: 5,
//       borderRadius: 50,
//       backgroundColor: colors.primary,
//       marginTop: 10,
//     },
//     inActiveIndicator: {
//       width: 5,
//       height: 5,
//       borderRadius: 50,
//       marginTop: 10,
//       backgroundColor: colors.background,
//     },
//     //new tab style
//     tabBar: {
//       backgroundColor: colors.background,
//       height: 50,
//     },
//     activeBackground: {
//       position: "absolute",
//     },
//     tabBarContainer: {
//       flexDirection: "row",
//       justifyContent: "space-evenly",
//     },
//     component: {
//       height: 60,
//       width: 60,
//       top: 0,
//     },
//     componentCircle: {
//       flex: 1,
//       borderRadius: 30,
//       backgroundColor: "transparent",
//     },
//     iconContainer: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     icon: {
//       height: 36,
//       width: 36,
//     },
//   });
// export default TabRoutes;
