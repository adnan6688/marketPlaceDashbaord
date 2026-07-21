import { useQuery } from '@tanstack/react-query';
import { Eye, ShieldAlert, } from 'lucide-react';
import { userReportDataApi, type TRpoerts } from './userReportApi';
import Pagination from '../../components/Pagination';
import { useState } from 'react';



export default function UserVerifications() {

    const [currentpage, setCurrentPage] = useState<number>(1)

    const { data, isLoading } = useQuery({
        queryKey: ['user_report_api', currentpage],
        queryFn: () => userReportDataApi(currentpage)
    })

  

    const reportsData = data?.data || []

    const onPrev = () => {
        setCurrentPage(currentpage - 1)
    }
    const nextPage = () => {
        setCurrentPage(currentpage + 1)
    }




    return (
        <div className="my-10">




            <div className="border border-gray-800 rounded-lg overflow-hidden bg-black">
                {/* Header */}
                <div className="bg-black">
                    <h2 className="text-white text-xl font-semibold px-6 pt-6 pb-6">
                        Reported Users
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-225 border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 bg-black text-sm text-gray-400">
                                    <th className="px-6 pb-4 text-left font-medium">
                                        User
                                    </th>

                                    <th className="px-6 pb-4 text-left font-medium">
                                        Email
                                    </th>

                                    <th className="px-6 pb-4 text-center font-medium">
                                        Reports
                                    </th>

                                    <th className="px-6 pb-4 text-center font-medium">
                                        Role
                                    </th>

                                    <th className="px-6 pb-4 text-center font-medium">
                                        Risk Level
                                    </th>

                                    <th className="px-6 pb-4 text-right font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800/50 bg-[#0B1220]">
                                {isLoading ? <tr>
                                    <td colSpan={8} className="py-8 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <span className="loading loading-spinner loading-md"></span>
                                            <span>Loading...</span>
                                        </div>
                                    </td>
                                </tr> : reportsData?.map((user : TRpoerts) => (
                                    <tr
                                        key={user.userId}
                                        className="bg-white/5 transition hover:bg-white/10"
                                    >
                                        {/* USER */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                                    {user.fullName.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        {user.fullName}
                                                    </h3>

                                                    <p className="text-xs text-gray-500">
                                                        {user.userId.slice(0, 12)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="px-6 py-5 text-sm text-gray-300">
                                            {user.email}
                                        </td>

                                        {/* REPORT COUNT */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full border border-red-800/40 bg-red-900/20 px-3 py-1 text-sm font-semibold text-red-400">
                                                {user.reportCount}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 flex  justify-center items-center">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold
      ${user.role === "admin"
                                                        ? "border-purple-800/40 bg-purple-900/20 text-purple-400"
                                                        : user.role === "seller"
                                                            ? "border-blue-800/40 bg-blue-900/20 text-blue-400"
                                                            : user.role === "user"
                                                                ? "border-green-800/40 bg-green-900/20 text-green-400"
                                                                : "border-gray-700 bg-gray-800/30 text-gray-400"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* LEVEL */}
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold
                        ${user.level === "Normal"
                                                        ? "border-green-800/40 bg-green-900/20 text-green-400"
                                                        : user.level === "Medium"
                                                            ? "border-yellow-800/40 bg-yellow-900/20 text-yellow-400"
                                                            : "border-red-800/40 bg-red-900/20 text-red-400"
                                                    }`}
                                            >
                                                <ShieldAlert size={14} />
                                                {user.level}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end">
                                                <button
                                                    className="flex items-center gap-2 rounded-lg border border-blue-800/40 bg-blue-900/20 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-900/40"
                                                >
                                                    <Eye size={17} />
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {reportsData?.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-12 text-center text-gray-500"
                                        >
                                            No reported users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>



                <Pagination currentPage={currentpage} onNext={nextPage} onPrev={onPrev} totalPages={data?.totalPages}></Pagination>

            </div>

        </div>
    );
}