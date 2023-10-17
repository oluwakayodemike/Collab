import { useUser } from "@clerk/clerk-react";

export function getUserName() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    console.log("please Sign In"); // Return a default name for guests or handle it as you wish.
  }

  return user.fullName; // You can return the user's full name or any other user information you need.
}
