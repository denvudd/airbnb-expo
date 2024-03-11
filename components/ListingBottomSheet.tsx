import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import Listing from "./Listing";

import { ListingItem } from "@/types";
import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ListingBottomSheetProps {
  listing: ListingItem[];
  category: string;
}

const ListingBottomSheet: React.FC<ListingBottomSheetProps> = ({
  listing,
  category,
}) => {
  const [refresh, setRefresh] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => ["10%", "98%"], []);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      style={styles.sheet}
      handleIndicatorStyle={styles.sheetIndicator}
    >
      <View style={{ flex: 1 }}>
        <Listing listings={listing} category={category} refresh={refresh} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity style={styles.btn} onPress={showMap}>
            <Text style={styles.btnText}>Map</Text>
            <Ionicons name="map" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListingBottomSheet;

const styles = StyleSheet.create({
  sheet: {
    marginHorizontal: 8,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  sheetIndicator: {
    backgroundColor: COLORS.grey,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: COLORS.dark,
    padding: 10,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 30,
  },
  btnText: {
    color: "#fff",
    fontFamily: "mon-sb",
  },
});
