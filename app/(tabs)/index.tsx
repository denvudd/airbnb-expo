import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  return (
    <View>
      <Link href="/(modals)/login">Login</Link>
      <Link href="/(modals)/booking">Booking</Link>
      <Link href="/listing/1337">Listing Details</Link>
    </View>
  );
};

export default Page;
