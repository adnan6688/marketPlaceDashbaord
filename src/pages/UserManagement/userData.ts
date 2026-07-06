
import sequreApi from "../../axios/axiosSequre"


export interface IAuth {
    provider: string;
    providerId: string;
}

export interface UserIfnoInterface {
    _id: string;
    fullName: string;
    bio: string | null;
    email: string;
    avatar: string | null;
    verifiedBadge: boolean;
    isVerified: boolean;
    isActive: "ACTIVE" | "INACTIVE" | "BLOCKED";
    isDeleted: boolean;
    role: "ADMIN" | "SELLER" | "USER";
    auths: IAuth[];
    createdAt: string;
    updatedAt: string;
}



export type MetaPerams = {
    page?: number,
    role?: string,
    searchTerm?: string,
}

export const userGetData = async (page?: number, role?: string, searchTerm?: string) => {

    const params: MetaPerams = {}
    if (page) {
        params.page = page
    }

    if (role && role !== 'All') {
        console.log(role.toUpperCase())
        params.role = role.toUpperCase()
    }
    if (searchTerm) {
        params.searchTerm = searchTerm
    }
    console.log(params)

    const res = await sequreApi.get(`/users`, { params })

    return {
        data: res?.data?.data?.users,
        meta: res?.data?.data?.meta
    }
}


export const userStatusUpdate = async (type: "ACTIVE" | "INACTIVE", userId: string) => {


    try {


        console.log(type ,  userId)
        const result = await sequreApi.patch(`/users/user-update_status/${userId}/${type}`)
        console.log(result?.data)
        return result?.data

    } catch (err) {
        console.log(err)
    }

}