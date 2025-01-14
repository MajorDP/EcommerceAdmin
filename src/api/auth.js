import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

export const login = async (user) => {
  let { data: userData, error } = await supabase
    .from("adminInfoEcomms")
    .select("*")
    .eq("username", user.username)
    .single();

  //if username not found
  if (error) {
    const error = {
      message: "Invalid credentials",
    };
    return error;
  }
  const isValid = await bcrypt.compare(user.password, userData.password);

  if (isValid) {
    sessionStorage.setItem(
      "user",
      JSON.stringify({ username: userData.username })
    );
  } else {
    //if password not matching
    const error = {
      message: "Invalid credentials",
    };
    return error;
  }
};

export const logout = () => {
  sessionStorage.clear("user");
};

export const checkSession = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user;
};
