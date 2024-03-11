import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { defaultStyles } from "@/styles";
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const [category, setCategory] = useState<string>("");

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={defaultStyles.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <Listing />
    </View>
  );
};

export default Page;
