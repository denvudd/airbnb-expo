import COLORS from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookingHeaderProps {}

const BookingHeader: React.FC<BookingHeaderProps> = ({}) => {
  const [active, setActive] = useState<number>(0);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity
        onPress={() => setActive(0)}
        style={{
          borderBottomWidth: active === 0 ? 2 : 0,
          borderBottomColor: "#000",
          height: 30,
        }}
      >
        <Text
          style={[
            styles.tabNames,
            {
              color: active === 0 ? "#000" : COLORS.grey,
            },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(1)}
        style={{
          borderBottomWidth: active === 1 ? 2 : 0,
          borderBottomColor: "#000",
          height: 30,
        }}
      >
        <Text
          style={[
            styles.tabNames,
            {
              color: active === 1 ? "#000" : COLORS.grey,
            },
          ]}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingHeader;

const styles = StyleSheet.create({
  tabNames: {
    fontFamily: "mon-sb",
    fontSize: 18,
  },
});
