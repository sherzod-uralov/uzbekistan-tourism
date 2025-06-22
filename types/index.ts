export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "tourist" | "admin";
  profilePicture?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tour {
  id: number;
  title: string;
  description: string;
  images: string[];
  location: string;
  price: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  category: "historical" | "cultural" | "adventure";
  isActive: boolean;
  duration: number;
  difficulty: "easy" | "moderate" | "challenging";
  includedServices: string;
  excludedServices: string;
  itinerary: string;
  meetingPoint: string;
  endPoint: string;
  createdAt: string;
  updatedAt: string;
  lemonSqueezyProductId?: string;
  lemonSqueezyVariantId?: string;
}

export interface Booking {
  id: number;
  tourId: number;
  userId: number;
  numberOfPeople: number;
  specialRequests?: string;
  contactPhone: string;
  contactEmail: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentId?: string;
  isPaid: boolean;
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
  tour?: Tour;
  user?: User;
}

export interface TourComment {
  id: number;
  comment: string;
  rating: number;
  userId: number;
  tourId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface CreateCommentData {
  comment: string;
  rating: number;
  tourId: number;
}

export interface UpdateCommentData {
  comment?: string;
  rating?: number;
}

export interface TourRating {
  averageRating: number;
  totalComments: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateBookingData {
  tourId: number;
  numberOfPeople: number;
  specialRequests?: string;
  contactPhone: string;
  contactEmail: string;
}

export interface CheckoutData {
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
