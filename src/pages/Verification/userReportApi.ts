import sequreApi from "../../axios/axiosSequre"




type PaginationParams = {
    page?: number
}


export const userReportDataApi = async (page?: number) => {

    try {

        const params: PaginationParams = {}

        if (page) {
            params.page = page
        }

        const res = await sequreApi.get('/reports/report-summary', { params })
        return res?.data || {}
    }
    catch (err) {
        console.log(err)
    }
}