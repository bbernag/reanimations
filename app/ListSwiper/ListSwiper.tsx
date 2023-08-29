import { Link } from "expo-router";
import Box from "../../ui/Box";
import Text from "../../ui/Text";
import { ScrollView } from "react-native";
import SwiperItem from "./SwiperItem";
export default function ListSwiper() {
  return (
    <Box
      flex={1}
      backgroundColor={"black"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box marginBottom={"lg"}>
        <Link href="/">
          <Text>Go back</Text>
        </Link>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
          <SwiperItem />
        </ScrollView>
      </Box>
    </Box>
  );
}
