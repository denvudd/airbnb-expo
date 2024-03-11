import React from "react";
import { Text, View } from "react-native";

interface ListingProps {}

const Listing: React.FC<ListingProps> = ({}) => {
  return (
    <View style={{ backgroundColor: "#c2c2c2" }}>
      <Text>Listing</Text>
    </View>
  );
};

export default Listing;
