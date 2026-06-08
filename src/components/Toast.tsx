import toast from "react-hot-toast";

type ToastProps = {
    type: "success" | "error";
    message: string;
};

export default function Toast({ type, message }: ToastProps) {
    if (type === "success") {
        toast.success(message, {
            style: {
                background: "#ffffff",
                color: "#111827",
                border: "1px solid #e5e7eb",
            },
        });
    } else if(type === 'error') {
        toast.error(message, {
            style: {
                background: "#ffffff",
                color: "#dc2626",
                border: "1px solid #dc2626",
            },
        });
    }

    return null;
}