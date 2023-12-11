// "@/constants/types/index.ts"

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  name: string;
  email: string;
  credits: number;
  avatar: string;
  accessToken: string;
};

export type ErrorResponse = {
  errors?: {message: string}[];
};

// export type UserProfileResponse = {
//   name: string;
//   email: string;
//   avatar: string;
//   credits: number;
//   wins: string[];
//   _count: {
//     listings: number;
//   };
// };

export type UserProfileResponse = {
  name: string;
  email: string;
  avatar: string;
  credits: number;
  wins: string[];
  _count: {
    listings: number;
  };
};

export type GetUserProfileParams = {
  username: string;
  accessToken: string;
};
export type MarketItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: string[];
  created: string;
  updated: string;
  endsAt: string;
  isActive?: boolean;
  bids?: BidInfo[]; // Make bids optional
  seller?: {
    // Make seller optional
    name: string;
    email: string;
    avatar: string;
    wins: string[];
  };
  _count: {
    bids: number;
  };
};
export type CreateListingData = {
  title: string;
  description?: string;
  tags?: string[];
  media?: string[];
  endsAt: string; // Instance of new Date().toISOString()
};

export type SellerInfo = {
  name: string;
  email: string;
  avatar: string;
};

export type BidInfo = {
  id: string;
  amount: number;
  bidderName: string;
  created: string;
};

export type ListingResponse = {
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
