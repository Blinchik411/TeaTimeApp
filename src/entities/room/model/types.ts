export interface RoomExperience {
    durationText: string;
    steps: string[];
    includes: string[];
    bookingTimes: string[];
    groupSizeText: string;
}

export interface Room {
    id: string;
    title: string;
    price: number;
    duration: string;
    maxGuests: number;
    experience: RoomExperience;
    reviews: Review[];
}

export interface Review {
    id: string;
    author: string;
    date: string;
    rating: number;
    text: string;
    avatarUrl: string;
}
