import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { replace } = useRouter();

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      replace("/");
    } catch (err: unknown) {
      console.log("Failed to sign in");
      console.log(err);
    }
  };
  return (
    <View className="gap-y-4 p-4">
      <Stack.Screen options={{ title: "Sign-in" }} />

      <View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        onPress={onSignInPress}
        className="flex items-center rounded-lg bg-primary p-2"
      >
        <Text className="text-foreground">Sign in</Text>
      </TouchableOpacity>

      <View>
        <Text>
          Do not have an account?{" "}
          <Link href="/sign-up/">
            <Text className="text-primary underline">Sign-up</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
