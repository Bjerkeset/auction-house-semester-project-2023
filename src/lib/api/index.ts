"use server";
import {cookies} from "next/headers";

const baseURL = "https://api.noroff.dev/api/v1";
const registerURL = `${baseURL}/auction/auth/register`;
const loginURL = `${baseURL}/auction/auth/login`;
const userProfileURL = `${baseURL}/auction/profiles`;

type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  name: string;
  email: string;
  credits: number;
  avatar: string;
  accessToken: string;
};
type ErrorResponse = {
  errors?: {message: string}[];
};

type UserProfileResponse = {
  name: string;
  email: string;
  avatar: string;
  credits: number;
  wins: string[];
  _count: {
    listings: number;
  };
};

type GetUserProfileParams = {
  username: string;
  accessToken: string;
};

export async function registerUser(registerData: RegisterData): Promise<void> {
  try {
    const response = await fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData.errors[0].message || "Failed to register user";
      // Include the entire response data in the thrown error
      throw new Error(errorMessage);
    }

    console.log("User registered successfully:", responseData);
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error; // Rethrow to handle it in the calling function
  }
}

export async function loginUser(loginData: LoginData): Promise<LoginResponse> {
  try {
    const response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to login";
      throw new Error(errorMessage);
    }

    const responseData: LoginResponse = await response.json();

    // // Store the accessToken in local storage
    // if (responseData.accessToken) {
    //   localStorage.setItem("authToken", responseData.accessToken);
    // }

    cookies().set("accessToken", responseData.accessToken);
    cookies().set("username", responseData.name);

    console.log("User logged in successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
}

export async function getUserProfile({
  username,
  accessToken,
}: GetUserProfileParams): Promise<UserProfileResponse> {
  try {
    const response = await fetch(`${userProfileURL}/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to retrieve user profile";
      throw new Error(errorMessage);
    }

    const responseData: UserProfileResponse = await response.json();
    console.log("User profile retrieved successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during fetching user profile:", error);
    throw error;
  }
}
