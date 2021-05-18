import React, { useRef, useState, useEffect } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { appStateAtom } from "../../recoil/AppState.recoil";

const AppStateWatch = () => {
  const currenAppState = useRef(AppState.currentState);
  const [, setAppState] = useRecoilState(appStateAtom);

  useEffect(() => {
    setAppState(currenAppState.current)
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      currenAppState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    currenAppState.current = nextAppState;
    setAppState(currenAppState.current);
    // console.log("AppState", currenAppState.current);
  };

  return null
};

export default AppStateWatch;