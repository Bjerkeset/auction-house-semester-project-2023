"use server";
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

type MarketItem = {
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
};

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
const marketItemsWithParamsURL = `${baseURL}/auction/listings?_seller=true&_bids=true&_active=true&_tag=15081995`;

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

export async function getMarketItems(): Promise<MarketItem[]> {
  try {
    const response = await fetch(marketItemsWithParamsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || "Failed to retrieve market items";
      throw new Error(errorMessage);
    }

    const responseData: MarketItem[] = await response.json();

    // console.log(
    //   "Market items with specified parameters retrieved successfully:",
    //   responseData
    // );
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

const tokenCookieObject = cookies().get("accessToken");
const accessToken = tokenCookieObject ? tokenCookieObject.value : null;

export async function bidOnListing(
  listingId: string,
  bidAmount: number
  // accessToken: string
): Promise<ListingResponse> {
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
    return responseData;
  } catch (error) {
    console.error("Error during bidding on listing:", error);
    throw error;
  }
}
