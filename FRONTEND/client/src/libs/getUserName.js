import { useUser } from "@clerk/clerk-react";

export function getUserName() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    console.log("please Sign In");
  }

  return user.fullName;
}
