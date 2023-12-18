"use server";
import {MarketItem, UserProfileResponse} from "@/constants/types";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

// "@/constants/types/index.ts"

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

// type UserProfileResponse = {
//   name: string;
//   email: string;
//   avatar: string;
//   credits: number;
//   wins: string[];
//   _count: {
//     listings: number;
//   };
// };

type GetUserProfileParams = {
  username: string;
  accessToken: string;
};

// type MarketItem = {
//   id: string;
//   title: string;
//   description: string;
//   tags: string[];
//   media: string[];
//   created: string;
//   updated: string;
//   endsAt: string;
//   bids: [];
//   _count: {
//     bids: number;
//   };
// };

type CreateListingData = {
  title: string;
  description?: string;
  tags?: string[];
  media?: string[];
  endsAt: string; // Instance of new Date().toISOString()
};

type SellerInfo = {
  name: string;
  email: string;
  avatar: string;
};

type BidInfo = {
  id: string;
  amount: number;
  bidderName: string;
  created: string;
};

type ListingResponse = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: string[];
  created: string;
  updated: string;
  endsAt: string;
  _count: {
    bids: number;
  };
  seller?: SellerInfo; // Optional seller information
  bids?: BidInfo[]; // Optional array of bids
};

const baseURL = "https://api.noroff.dev/api/v1";
const registerURL = `${baseURL}/auction/auth/register`;
const loginURL = `${baseURL}/auction/auth/login`;
const userProfileURL = `${baseURL}/auction/profiles`;
const marketItemsURL = `${baseURL}/auction/listings`;
const filteredMarketItemsURL = `${baseURL}/auction/listings?_tag=15081995&_active=true`;
const createListingURL = `${baseURL}/auction/listings`;

export const getUsernameAndAccessToken = () => {
  const tokenCookieObject = cookies().get("accessToken");
  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;
  const usernameCookieObject = cookies().get("username");
  const username = usernameCookieObject ? usernameCookieObject.value : null;
  return {accessToken, username};
};

export async function registerUser(registerData: RegisterData): Promise<void> {
  console.log("registerURL>>>>>>>>>>>>>><", registerURL);

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
      console.log(response);
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to login";
      throw new Error(errorMessage);
    }

    const responseData: LoginResponse = await response.json();

    cookies().set("accessToken", responseData.accessToken);
    cookies().set("username", responseData.name);

    console.log("User logged in successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfileResponse> {
  const {accessToken, username} = getUsernameAndAccessToken();

  if (!username || !accessToken) {
    throw new Error("Username or access token is missing");
  }

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
    // console.log("User profile retrieved successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during fetching user profile:", error);
    throw error;
  }
}

export async function logoutUser() {
  cookies().delete("accessToken");
  cookies().delete("username");
  revalidatePath("/");
}

const marketItemsWithParamsURL = `${baseURL}/auction/listings?_seller=true&_bids=true&_active=true`;

export async function getMarketItems(tag?: string): Promise<MarketItem[]> {
  console.log("tag>>>>>>>>>>>>>>", tag);
  // Use the tag directly if provided, else default to "15081995"
  const tagParam = tag ? tag : "15081995";
  console.log("tagParam>>>>>>>>>>>>>>", tagParam);
  // Build URL with the tag parameter
  const url = `${marketItemsWithParamsURL}&_tag=${tagParam}`;
  console.log("Constructed URL for getMarketItems:", url); // Debugging log

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to retrieve market items";
      throw new Error(errorMessage);
    }

    const responseData: MarketItem[] = await response.json();
    console.log("Fetcheeeeeeeeeed");
    return responseData;
  } catch (error) {
    console.error("Error during fetching market items with parameters:", error);
    throw error;
  }
}

export async function createListing(
  listingData: CreateListingData,
  accessToken: string
): Promise<ListingResponse> {
  try {
    // Inserting the constant tag at the beginning of array to filter based on it later.
    const constantTag = "15081995";
    if (Array.isArray(listingData.tags)) {
      listingData.tags.unshift(constantTag); // prepend if tags array exists
    } else {
      listingData.tags = [constantTag]; // initialize tags with the constant tag
    }

    const response = await fetch(createListingURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Assuming the endpoint requires authentication
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to create listing";
      throw new Error(errorMessage);
    }

    const responseData: ListingResponse = await response.json();
    revalidatePath("/");
    console.log("Listing created successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during listing creation:", error);
    throw error;
  }
}

export async function bidOnListing(
  listingId: string,
  bidAmount: number
  // accessToken: string
): Promise<ListingResponse> {
  const {accessToken, username} = getUsernameAndAccessToken();
  if (!username || !accessToken) {
    throw new Error("Username or access token is missing");
  }
  try {
    const response = await fetch(
      `${baseURL}/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({amount: bidAmount}),
      }
    );

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to place bid";
      throw new Error(errorMessage);
    }
    const responseData: ListingResponse = await response.json();
    console.log("Bid placed successfully:", responseData);
    revalidatePath("/");
    return responseData;
  } catch (error) {
    console.error("Error during bidding on listing:", error);
    throw error;
  }
}

export async function deleteListing(
  listingId: string
  // accessToken: string
): Promise<void> {
  const {accessToken, username} = getUsernameAndAccessToken();

  if (!username || !accessToken) {
    throw new Error("Username or access token is missing");
  }
  try {
    const deleteListingURL = `${baseURL}/auction/listings/${listingId}`;

    const response = await fetch(deleteListingURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to delete listing";
      throw new Error(errorMessage);
    }

    console.log("Listing deleted successfully");
    revalidatePath("/");
  } catch (error) {
    console.error("Error during listing deletion:", error);
    throw error;
  }
}

export async function getAllListingsByProfile(
  profileName?: string
): Promise<MarketItem[]> {
  const {accessToken, username} = getUsernameAndAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  // Use the provided profileName or fall back to the username from getUsernameAndAccessToken
  const profileToQuery = profileName || username;

  if (!profileToQuery) {
    throw new Error("Profile name is missing");
  }

  try {
    const response = await fetch(
      `${baseURL}/auction/profiles/${profileToQuery}/listings?_seller=true&_bids=true&_active=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message ||
        "Failed to retrieve listings by profile";
      throw new Error(errorMessage);
    }

    const responseData: MarketItem[] = await response.json();
    console.log("Listings by profile retrieved successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during fetching listings by profile:", error);
    throw error;
  }
}

export async function getAllBidsByProfile(): Promise<BidInfo[]> {
  const {accessToken, username} = getUsernameAndAccessToken();

  if (!username || !accessToken) {
    throw new Error("Username or access token is missing");
  }
  try {
    const response = await fetch(
      `${baseURL}/auction/profiles/${username}/bids`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message ||
        "Failed to retrieve bids by profile";
      throw new Error(errorMessage);
    }

    const responseData: BidInfo[] = await response.json();
    // console.log("Bids by profile retrieved successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error during fetching bids by profile:", error);
    throw error;
  }
}

export async function updateProfileAvatar(avatarUrl: string) {
  const {accessToken, username} = getUsernameAndAccessToken();

  if (!username || !accessToken) {
    throw new Error("Username or access token is missing");
  }
  const updateAvatarURL = `${baseURL}/auction/profiles/${username}/media`;

  try {
    const response = await fetch(updateAvatarURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({avatar: avatarUrl}),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to update profile avatar";
      throw new Error(errorMessage);
    }
    revalidatePath("/");

    console.log("Profile avatar updated successfully");
  } catch (error) {
    console.error("Error during updating profile avatar:", error);
    throw error;
  }
}
