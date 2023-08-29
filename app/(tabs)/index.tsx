import Box from "../../ui/Box";
import { Link } from "expo-router";
import Text from "../../ui/Text";

const screens = [
  "ListSwiper/ListSwiper",
  "BottomSheet/BottomSheet",
  "CubicPage/CubicPage",
];

export default function TabOneScreen() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"black"}
      gap={"lg"}
    >
      {screens.map((screen) => (
        <Link key={screen} href={`/${screen}`}>
          <Text fontSize={18}>{screen}</Text>
        </Link>
      ))}
    </Box>
  );
}
