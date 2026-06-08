import sequreApi from "../../axios/axiosSequre";
import { getErrorMessage } from "../Error/getErrorMessage";

export interface SellerAuth {
    provider: string;
    providerId: string;
}

export interface Seller {
    _id: string;
    fullName: string;
    email: string;
    badge: boolean;
    isActive: "ACTIVE" | "INACTIVE";
    isDeleted: boolean;
    isVerified: boolean;
    role: "USER" | "ADMIN" | string;
    auths: SellerAuth[];
    createdAt: string;
    updatedAt: string;
}

export interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    sold: boolean;
    sellerId: string;
    isBoosted: boolean;
    viewCount: number;
    inquiryCount: number;
    year: number;
    mileage: number;
    trans: string;
    color: string;
    imagesAndVideos: string[]; // array of URLs
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    isBookmarked: boolean;
    __v?: number;
}

export interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface ListingsResponse {
    data: Listing[];
    meta: Meta;
}


export type PagePrams = {
    page?: number,
    sold?: boolean | null,
    isBoosted?: boolean | null,
    category?: string | null,
    searchTerm?: string | null

}

export const fetchListings = async (page: number, sold?: boolean | null, isBoosted?: boolean | null, category?: string | null, searchTerm?: string | null): Promise<ListingsResponse> => {


    const params: PagePrams = {};

    if (page) {
        params.page = Number(page);
    }
    if (sold) {
        params.sold = sold
    }
    if (isBoosted) {
        params.isBoosted = isBoosted
    }
    if (category) {
        params.category = category
    }
    if (searchTerm) {
        params.searchTerm = searchTerm
    }

    const response = await sequreApi.get(`/listings/listing/admin`, { params });


    return {
        data: response.data.data.data,   // array of listings
        meta: response.data.data.meta   // pagination info
    };
};


export const countofListing = async () => {

    try {
        const result = await sequreApi.get('/listings/listing/count')
        return {
            result: result?.data?.data
        }
    }
    catch (err) {
        const message = getErrorMessage(err)
        return {
            message
        }
    }
}


















