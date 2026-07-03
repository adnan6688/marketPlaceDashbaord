import sequreApi from "../../axios/axiosSequre"




export const updateUserInfo = async (data: FormData) => {

    try {
        const res = await sequreApi.patch(`/users/update`,data)
        return res
    } catch {
        //
    }
}