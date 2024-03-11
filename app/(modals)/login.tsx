import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWarmUpBrowser } from "@/hooks/use-warm-up-browser";

import { defaultStyles } from "@/styles";
import COLORS from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

interface LoginProps {}

enum AuthStrategy {
  APPLE = "oauth_apple",
  GOOGLE = "oauth_google",
  FACEBOOK = "oauth_facebook",
}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();

  useWarmUpBrowser();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: AuthStrategy) => {
    const selectedAuth = {
      [AuthStrategy.APPLE]: appleAuth,
      [AuthStrategy.GOOGLE]: googleAuth,
      [AuthStrategy.FACEBOOK]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log(createdSessionId)

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error("OAuth error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[
          defaultStyles.inputField,
          {
            marginBottom: 40,
          },
        ]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separator}>or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={defaultStyles.btnOutline}>
          <Ionicons name="call" size={24} style={defaultStyles.btnIcon} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(AuthStrategy.APPLE)}
        >
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(AuthStrategy.GOOGLE)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(AuthStrategy.FACEBOOK)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 26,
  },
  separatorContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separatorLine: {
    borderBottomColor: "#000",
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator: {
    fontFamily: "mon-sb",
    color: COLORS.grey,
  },
  buttonsContainer: {
    gap: 20,
  },
});
