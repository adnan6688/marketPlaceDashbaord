import axios from "axios";

export const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message || "Something went wrong";
    }

    if (err instanceof Error) {
        return err.message;
    }

    return "Unknown error";
};