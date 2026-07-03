import sequreApi from "../../axios/axiosSequre"

type Tparams = {
    page?: number,
    limit?: number
}


export const activeBoostedData = async (page?: number) => {


    try {
        const params: Tparams = {}
        if (page) {
            params.page = page

        }
        params.limit = 10
        const res = await sequreApi.get('/boosts/active', { params })

        return {
            data: res?.data?.data || [],
            meta: res?.data?.meta || {}
        }
    } catch (err) {
        console.log(err)
    }
}

export const statsofBoostedList = async () => {

    try {
        const res = await sequreApi.get('/boosts/stats')
        return res?.data?.data || {}
    } catch (err) {
        console.log(err)
    }
}

export const revenueOverviewApi = async (year:number)=>{
    try{

        const result = await sequreApi.get(`/boosts/revenue-overview?year=${year}`)
        return result?.data?.data || []
    }catch(err){
        console.log(err)
    }
}