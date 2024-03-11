import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";

import listingsData from "@/data/airbnb-listings.json";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const [category, setCategory] = useState<string>("");
  const items = useMemo(() => listingsData as any, []);

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listing category={category} listings={items} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 135,
    backgroundColor: "#c2c2c2",
  },
});
