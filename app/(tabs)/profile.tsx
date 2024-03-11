import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "@/constants/Colors";
import { defaultStyles } from "@/styles";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string | undefined | null>(
    user?.firstName
  );
  const [lastName, setLastName] = useState<string | undefined | null>(
    user?.lastName
  );
  const [email, setEmail] = useState<string | undefined | null>(
    user?.emailAddresses[0].emailAddress
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return undefined;

    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return null;

      await user?.update({
        firstName,
        lastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {isEdit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={COLORS.dark}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={styles.name}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setIsEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={COLORS.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && (
        <Button title="Log Out" onPress={() => signOut()} color={COLORS.dark} />
      )}

      {!isSignedIn && (
        <Link href="/(modals)/login" asChild>
          <Button
            title="Log In"
            onPress={() => signOut()}
            color={COLORS.dark}
          />
        </Link>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    fontFamily: "mon-sb",
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.grey,
  },
  name: {
    fontFamily: "mon-b",
    fontSize: 22,
  },
  editRow: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
