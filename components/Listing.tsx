import { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import Animated from "react-native-reanimated"

import { defaultStyles } from "@/styles";
import type { ListingItem } from "@/types";
import COLORS from "@/constants/Colors";

interface ListingProps {
  listings: any[];
  category: string;
}

const Listing: FC<ListingProps> = ({ category, listings }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [category]);

  const renderRow: ListRenderItem<ListingItem> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={styles.favoriteBtn}>
            <Ionicons name="heart-outline" size={22} color="#000" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={defaultStyles.semiBold}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star-outline" size={16} color="#FF9529" />
              <Text style={styles.rating}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <Text style={defaultStyles.regular}>{item.room_type}</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={defaultStyles.semiBold}>€ {item.price}</Text>
            <Text style={defaultStyles.regular}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={isLoading ? [] : listings}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  favoriteBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#A2A0A2",
    position: "absolute",
    top: 25,
    right: 25,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    fontFamily: "mon-sb",
    color: "#FF9529",
  },
});
