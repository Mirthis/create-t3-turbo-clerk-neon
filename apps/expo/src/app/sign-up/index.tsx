import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { replace } = useRouter();

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      replace("/");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <Stack.Screen options={{ title: "Sign-in" }} />

      <View className="gap-y-4 p-4">
        {!pendingVerification && (
          <>
            <View>
              <TextInput
                autoCapitalize="none"
                value={firstName}
                placeholder="First Name..."
                className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>
            <View>
              <TextInput
                autoCapitalize="none"
                value={lastName}
                placeholder="Last Name..."
                className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View>
            <View>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View>
              <TextInput
                value={password}
                placeholder="Password..."
                placeholderTextColor="#000"
                secureTextEntry={true}
                className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <TouchableOpacity
              onPress={onSignUpPress}
              className="flex items-center rounded-lg bg-primary p-2"
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
            <View>
              <Text>
                Do not have an account?{" "}
                <Link href="/sign-in/">
                  <Text className="text-primary underline">Sign-in</Text>
                </Link>
              </Text>
            </View>
          </>
        )}
        {pendingVerification && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Code..."
                className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity
              onPress={onPressVerify}
              className="flex items-center rounded-lg bg-primary p-2"
            >
              <Text>Verify Email</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
