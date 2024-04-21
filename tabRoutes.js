import { View, Image, StyleSheet, AppState } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationString from "../constant/navigationString";
import { useTheme } from "react-native-paper";
import AccountRoutes from "./sub-routes/accountRoutes";
import HomeRoutes from "./sub-routes/homeRoutes";
import { OneSignal } from "react-native-onesignal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { useQuery } from "react-query";
import agent from "../../api/agent";
import { Toast } from "react-native-toast-notifications";
import { toastSetting } from "../core/alertSettings";
import { handleLogoutOnError } from "../features/logoutSession";
import SurveyModal from "../modal/surveyModal";
import { useAppState } from "../core/appStateHandle";

const HomeTab = createBottomTabNavigator();

const TabRoutes = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const tabStyle = styles(theme.colors);
  const isAppActive = useAppState();
  const [loader, setLoader] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const token = currentUser?.token;

  const { refetch } = useQuery(
    ["check-survey"],
    () =>
      agent.Survey.checkSurveyActive(
        { UserId: currentUser?._id },
        true,
        false,
        token
      ),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        if (d.Status === "success") {
          if (d.Active === false) {
            setModelShow(true);
          } else if (d.Active === true) {
            Toast.show(
              "You have already participated on survey",
              toastSetting("warning")
            );
          }
        } else {
          Toast.show(
            "You have already participated on survey",
            toastSetting("warning")
          );
        }
      },
      onError: async (error) => {
        if (error?.response?.status === 403) {
          await handleLogoutOnError();
        }
      },
    }
  );
  const { refetch: secondRefetch } = useQuery(
    ["check-survey2"],
    () =>
      agent.Survey.checkSurveyActive(
        { UserId: currentUser?._id },
        true,
        false,
        token
      ),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        if (d.Status === "success") {
          if (d.Active === false) {
            setLoader(false);
            setModelShow(true);
          } else if (d.Active === true) {
            setLoader(false);
          }
        } else {
          // Toast.show(
          //   "You have already participated on survey",
          //   toastSetting("warning")
          // );
        }
      },
      onError: async (error) => {
        if (error?.response?.status === 403) {
          await handleLogoutOnError();
        }
      },
    }
  );
  OneSignal.Notifications.addEventListener("click", (event) => {
    if (event?.notification?.additionalData?.page === "survey-notification") {
      setIsNotification(true);
      refetch();
    }
  });
  useEffect(() => {
    if (isAppActive) {
      setTimeout(() => {
        secondRefetch();
      }, 400);
    }
  }, [isAppActive]);
  useEffect(() => {
    refetch();

    return () => {};
  }, []);

  return (
    <Fragment>
      <HomeTab.Navigator
        initialRouteName={navigationString.Home}
        screenOptions={{
          backBehavior: "history",
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.grey,
          // tabBarShowLabel: false
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 5,
            height: 50,
            borderTopWidth: 0,
          },
        }}
      >
        <HomeTab.Screen
          name={navigationString.Home}
          component={HomeRoutes}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={{
                    tintColor: focused
                      ? theme.colors.primary
                      : theme.colors.grey,
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                  }}
                  source={require("../../assets/icons/homeActive.png")}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return (
                <View
                  style={
                    focused
                      ? tabStyle.activeIndicator
                      : tabStyle.inActiveIndicator
                  }
                ></View>
              );
            },
          }}
        />
        {/* <HomeTab.Screen
        name={navigationString.Home + "1"}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? theme.colors.primary : theme.colors.grey,
                  width: 20,
                  height: 20,
                  objectFit: "contain",
                }}
                source={require("../../assets/icons/clockActive.png")}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <View
                style={
                  focused
                    ? tabStyle.activeIndicator
                    : tabStyle.inActiveIndicator
                }
              ></View>
            );
          },
        }}
      />
      <HomeTab.Screen
        name={navigationString.Home + "2"}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? theme.colors.primary : theme.colors.grey,
                  width: 20,
                  height: 20,
                  objectFit: "contain",
                }}
                source={require("../../assets/icons/trainActive.png")}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <View
                style={
                  focused
                    ? tabStyle.activeIndicator
                    : tabStyle.inActiveIndicator
                }
              ></View>
            );
          },
        }}
      /> */}
        <HomeTab.Screen
          name={navigationString.Account}
          component={AccountRoutes}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={{
                    tintColor: focused
                      ? theme.colors.primary
                      : theme.colors.grey,
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                  }}
                  source={require("../../assets/icons/accountActive.png")}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              return (
                <View
                  style={
                    focused
                      ? tabStyle.activeIndicator
                      : tabStyle.inActiveIndicator
                  }
                ></View>
              );
            },
          }}
        />
      </HomeTab.Navigator>
      <SurveyModal
        modalShow={modelShow}
        setModelShow={setModelShow}
        isFocused={isAppActive}
        isNotification={isNotification}
        setIsNotification={setIsNotification}
      />
    </Fragment>
  );
};
const styles = (colors) =>
  StyleSheet.create({
    activeIndicator: {
      width: 5,
      height: 5,
      borderRadius: 50,
      backgroundColor: colors.primary,
      marginTop: 10,
    },
    inActiveIndicator: {
      width: 5,
      height: 5,
      borderRadius: 50,
      marginTop: 10,
      backgroundColor: colors.background,
    },
  });
export default TabRoutes;
