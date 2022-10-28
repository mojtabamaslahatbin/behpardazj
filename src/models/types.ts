export type User = {
    firstName: string;
    lastName: string;
    city: string;
    address: string;
};

export type ApiResponse = {
    createdAt: string;
    firstName: string;
    city: string;
    lastName: string;
    address: string;
    id: string;
};

export type UseApiResponse = {
    data: ApiResponse[];
    isLoading: boolean;
    error: string | null;
};

export type FlashMessageType = "success" | "danger";
