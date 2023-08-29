import React from "react";
import Box from "../../ui/Box";
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Text from "../../ui/Text";
import { StyleSheet } from "react-native";

type ContextType = {
  startX: number;
  startY: number;
};

const LEFT_WIDTH = 110;
const RIGHT_WIDTH = 110;

function SwiperItem() {
  const x = useSharedValue(0);
  const isOpen = useSharedValue(false);

  const handleTranslation = (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
    ctx
  ) => {
    "worklet";
    let translation = 0;

    console.log("event.velocityX", event.velocityX);

    if (Math.abs(event.velocityX) > 800) {
      translation = event.translationX > 0 ? 60 : -60;
    } else {
      translation =
        event.translationX > 0
          ? Math.min(event.translationX, 60)
          : Math.max(event.translationX, -60);
    }
    console.log("isOpen.value", isOpen.value);
    console.log("translation", translation);
    console.log("x.value", x.value);

    isOpen.value =
      isOpen.value &&
      ((translation > 0 && translation > x.value) ||
        (translation < 0 && translation < x.value))
        ? false
        : translation === -60 || translation === 60;

    x.value = isOpen.value
      ? translation < 0 && translation === -60
        ? -RIGHT_WIDTH
        : translation === 60
        ? LEFT_WIDTH
        : 0
      : 0;
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, ctx: ContextType) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx: ContextType) => {
      x.value = event.translationX + ctx.startX;
    },
    onCancel: handleTranslation,
    // onCancel: (event, ctx: ContextType) => {
    //   x.value = withDecay({
    //     velocity: event.velocityX,
    //     clamp: [-200, 200],
    //   });
    //   x.value = event.translationX + ctx.startX;
    // },
    onEnd: handleTranslation,
  });

  const rStyle = useAnimatedStyle(() => {
    const animateTranslation =
      x.value === LEFT_WIDTH || x.value === -RIGHT_WIDTH || x.value === 0;

    const translateX = animateTranslation
      ? withTiming(x.value, { duration: 500 })
      : x.value;

    return {
      transform: [{ translateX }],
    };
  });

  const rStyleLeft = useAnimatedStyle(() => {
    const width =
      x.value > 0
        ? x.value === LEFT_WIDTH
          ? withTiming(LEFT_WIDTH, { duration: 500 })
          : x.value
        : withTiming(0, { duration: 500 });

    return {
      width,
    };
  });

  const rStyleRight = useAnimatedStyle(() => {
    const width =
      x.value < 0
        ? x.value === -RIGHT_WIDTH
          ? withTiming(RIGHT_WIDTH, { duration: 500 })
          : Math.abs(x.value)
        : withTiming(0, { duration: 500 });

    return {
      width,
    };
  });

  return (
    <Box width={"100%"} flexDirection={"row"} height={60}>
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        activeOffsetY={[-60, 60]}
        onGestureEvent={onGestureEvent}
        shouldCancelWhenOutside
      >
        <Animated.View style={[styles.swipeContainer, rStyle]}>
          <Box backgroundColor={"purpleDark"} height={"100%"} width={"100%"}>
            <Text>This is the principal content</Text>
          </Box>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.left, rStyleLeft]}>
        <Box backgroundColor={"greenDark"} height="100%" flexDirection={"row"}>
          <Box
            flex={1}
            width={"33%"}
            backgroundColor={"greenLight"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} fontSize={22} color={"black"}>
              1
            </Text>
          </Box>
          <Box
            flex={1}
            width={"33%"}
            backgroundColor={"foreground"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} fontSize={22} color={"black"}>
              2
            </Text>
          </Box>
          <Box
            flex={1}
            width={"33%"}
            backgroundColor={"white"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} fontSize={22} color={"black"}>
              3
            </Text>
          </Box>
        </Box>
      </Animated.View>
      <Animated.View style={[styles.right, rStyleRight]}>
        <Box backgroundColor={"greenPrimary"} height="100%">
          <Text>Hi, swipe me right</Text>
        </Box>
      </Animated.View>
    </Box>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: "#FFFFFF20",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  right: {
    marginLeft: "auto",
    height: "100%",
  },
  left: {
    height: "100%",
  },
});

export default SwiperItem;
