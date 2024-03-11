import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface ListingIdProps {}

const ListingId: React.FC<ListingIdProps> = ({}) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default ListingId;
