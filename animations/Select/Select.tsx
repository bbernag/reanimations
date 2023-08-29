import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableHighlight, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedRef,
  useSharedValue,
  interpolate,
  withTiming,
  runOnJS,
  measure,
} from "react-native-reanimated";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";
import OptionsContainerPlaceholder from "./OptionsContainerPlaceholder";
import { useSelectContext } from "./SelectContext";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { TSelect } from "./Types/TSelect";
import { TOption } from "./Types/TOption";
import Chevron from "./Chevron";

const OPTIONS = [
  { name: "Inter Miami", value: "inter-miami" },
  { name: "Orlando City", value: "orlando-city" },
  { name: "Atlanta United", value: "atlanta-united" },
  { name: "Chicago Fire", value: "chicago-fire" },
  { name: "Columbus Crew", value: "columbus-crew" },
  { name: "D.C. United", value: "dc-united" },
  { name: "FC Cincinnati", value: "fc-cincinnati" },
];

const SAFE_AREA_VIEW_HEIGHT = 90;
const SCREEN_HEIGHT =
  Dimensions.get("window").height - SAFE_AREA_VIEW_HEIGHT - 200;

function Select({
  name,
  onChange,
  optionStyle,
  defaultValue,
  optionsPlaceholder = "No options",
  selectedOptionStyle,
  color = "#00000090",
  optionsHeight = 200,
  optionsContainerStyle,
  backgroundColor = "white",
  options: _options = OPTIONS,
  selectedOptionContainerStyle,
  selectedValue: _selectedValue,
  placeholder = "Select an option",
}: TSelect) {
  const { addSelect, removeSelect, currentSelect, setCurrentSelect } =
    useSelectContext();
  const [options, setOptions] = useState<TOption[]>(_options);
  const [selected, setSelected] = useState<TOption | undefined>(
    _selectedValue || defaultValue
  );
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    setOptions(options);
  }, [options]);

  const handleOpen = () => {
    setOpen((_open) => {
      if (!_open) {
        setCurrentSelect(name);
      }

      return !_open;
    });
  };

  const handleSelectedOption = (option: TOption) => {
    onChange?.(option);
    setSelected(option);
    setOpen(false);
  };

  const currentValue = _selectedValue || selected;

  const containerStyleAnimation = useDerivedValue(() => {
    return open ? withTiming(1) : withTiming(0);
  });

  React.useEffect(() => {
    addSelect(name);

    return () => {
      removeSelect(name);
    };
  }, [name]);

  React.useEffect(() => {
    if (currentSelect !== name) {
      setOpen(false);
    }
  }, [currentSelect]);

  const aRef = useAnimatedRef<View>();
  const pageY = useSharedValue(0);
  const tooltipPosition = useSharedValue("bottom" as "bottom" | "top");

  const rContainerStyle = useAnimatedStyle(() => {
    const radius = interpolate(containerStyleAnimation.value, [1, 0], [0, 5]);
    const borderColor = interpolateColor(
      containerStyleAnimation.value,
      [0, 1],
      ["transparent", "#00000005"]
    );

    const containerStylePosition =
      tooltipPosition.value === "bottom"
        ? { borderBottomLeftRadius: radius, borderBottomRightRadius: radius }
        : { borderTopLeftRadius: radius, borderTopRightRadius: radius };

    return {
      borderBottomWidth: 1,
      ...containerStylePosition,
      borderBottomColor: borderColor,
    };
  });

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd() {
        const layout = measure(aRef);

        if (layout) {
          pageY.value = layout?.y + layout?.height || 0;
          tooltipPosition.value =
            layout?.pageY > SCREEN_HEIGHT ? "top" : "bottom";
          runOnJS(handleOpen)();
        }
      },
    });

  return (
    <>
      <View ref={aRef}>
        <GestureHandlerRootView>
          <TapGestureHandler onGestureEvent={tapGestureEvent}>
            <Animated.View
              style={[{ backgroundColor }, styles.select, rContainerStyle]}
            >
              <TouchableHighlight
                activeOpacity={0.2}
                underlayColor={backgroundColor}
                style={[
                  styles.option_touchable,
                  { backgroundColor },
                  selectedOptionContainerStyle,
                ]}
              >
                <View style={styles.select_selected_option_container}>
                  <Animated.Text
                    style={[
                      styles.select_option__selected,
                      { color },
                      selectedOptionStyle,
                    ]}
                  >
                    {currentValue?.name || placeholder}
                  </Animated.Text>
                  <Chevron animation={containerStyleAnimation} color={color} />
                </View>
              </TouchableHighlight>
            </Animated.View>
          </TapGestureHandler>
        </GestureHandlerRootView>
      </View>
      <OptionsContainer
        tooltipPosition={tooltipPosition}
        optionsPlaceholder={optionsPlaceholder}
        open={open}
        optionsContainerStyle={optionsContainerStyle}
        optionsHeight={optionsHeight}
        backgroundColor={backgroundColor}
        color={color}
        pageY={pageY.value}
      >
        {open ? (
          options.length ? (
            options.map((option) => {
              return (
                <Option
                  color={color}
                  option={option}
                  key={option.value}
                  optionStyle={optionStyle}
                  handleSelectedOption={handleSelectedOption}
                  isActive={option.value === currentValue?.value}
                />
              );
            })
          ) : (
            <OptionsContainerPlaceholder
              optionsPlaceholder={optionsPlaceholder}
              color={color}
              optionsHeight={optionsHeight}
            />
          )
        ) : null}
      </OptionsContainer>
    </>
  );
}

const styles = StyleSheet.create({
  select: {
    borderRadius: 5,
    position: "relative",
    marginVertical: 16,
    justifyContent: "center",
    // height: 45,
    flex: 1,
    width: "100%",
  },
  select_selected_option_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  option_touchable: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 5,
  },
  select_option__selected: {
    paddingLeft: 8,
    color: "#fff",
  },
});

export default Select;
