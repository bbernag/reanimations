import React from "react";
import Box from "../../ui/Box";
import Text from "../../ui/Text";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

interface IBottomSheet {}

function BottomSheet({}: IBottomSheet) {
  const bottomSheetHeight = useSharedValue(20);

  const handleSwipe = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = bottomSheetHeight.value;
    },
    onActive: (event, ctx) => {
      bottomSheetHeight.value = ctx.startY + event.translationY;
    },
    onCancel: () => {
      console.log("cancelled");
    },
    onEnd: (event, ctx) => {
      const treshHold = 60;
      if (event.translationY < 0 && event.translationY < -treshHold) {
        bottomSheetHeight.value = withSpring(-400);
      } else {
        bottomSheetHeight.value = withTiming(-20);
      }
    },
  });

  const rBottomSheet = useAnimatedStyle(() => {
    const height = Math.abs(bottomSheetHeight.value);

    return { height };
  });
  return (
    <Box flex={1}>
      <Text>BottomSheet</Text>
      <Animated.View style={[styles.bottomSheet, rBottomSheet]}>
        <PanGestureHandler onGestureEvent={handleSwipe}>
          <Animated.View style={[styles.bottomBar]}>
            <Box
              borderBottomColor={"greenDark"}
              borderBottomWidth={6}
              width={60}
              borderRadius={5}
            ></Box>
          </Animated.View>
        </PanGestureHandler>
        <Box height={"100%"} width={"100%"}>
          <Text fontSize={32}>Content</Text>
        </Box>
      </Animated.View>
    </Box>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    top: -35,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
    width: "100%",
    padding: 20,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: "#FFFFFF50",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default BottomSheet;
