import sequreApi from "../../axios/axiosSequre"
import { getErrorMessage } from "../Error/getErrorMessage"





export const topListing = async () => {

    try {
        const result = await sequreApi.get('/admin/analytics/top-listings')
        return {
            result: result?.data
        }
    } catch (err) {
        const message = getErrorMessage(err)

        return {
            message
        }
    }
}

export const recentUsers = async () => {

    try {
        const result = await sequreApi.get('/users/recentUser')

        return {
            result: result?.data
        }
    } catch (err) {
        const message = getErrorMessage(err)
        return {
            message
        }
    }
}



export const userGrowth = async (range?: string) => {


    try {
        const res = await sequreApi.get(`/admin/analytics/user-growth?range=${range ?? 'monthly'}`)
     
        return res?.data?.data ?? []
    } catch {
        //
    }
}