import React from "react";
import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />

      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Log in</Text>
        </Link>
      )}
    </View>
  );
};

export default Profile;
