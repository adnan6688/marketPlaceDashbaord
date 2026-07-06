import { useQuery } from '@tanstack/react-query';
import { Ban, Check, ChevronDown, CircleCheckBig, CircleX, Filter, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { userGetData, userStatusUpdate, type UserIfnoInterface } from './userData';
import Pagination from '../../components/Pagination';
import { Debounce } from '../../components/Debounce';
import Toast from '../../components/Toast';



const Role = {
  SELLER: "Seller",
  BUYER: "Buyer",
} as const;


const UserManagement: React.FC = () => {

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("All");


  const [selectId, setSelectId] = useState<string>("")



  const [search, setSearch] = useState<string>('')
  const [finalSearch, setFinalSearch] = useState<string>('')

  const users = ["All", "Buyer", "Seller"];


  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);


  const debouncedSearch = Debounce(search, 500);

  useEffect(() => {
    setFinalSearch(debouncedSearch);
  }, [debouncedSearch]);


  const { data: UserData, isLoading, error, refetch } = useQuery({
    queryKey: ['userDAta', currentPage, selectedUser, finalSearch],
    queryFn: () => userGetData(currentPage, selectedUser, finalSearch),
  })





  const onPrev = () => {
    setCurrentPage(currentPage - 1)
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const statusUpdateFn = async (userId: string, type: "ACTIVE" | "INACTIVE") => {


    setSelectId(userId)
    try {
      const res = await userStatusUpdate(type, userId)
      console.log(res)
      refetch()

      Toast({type : 'success' , message : 'User status update successfully'})
    } catch (err) {
      console.log(err)
    }
    finally {
      setSelectId("")
    }

  }




  if (error) {

    return <div>
      <h1 className='text-center text-white'>Something Error</h1>
    </div>
  }

  return (
    <div className="w-full   space-y-4">



      <div className="flex flex-col w-full lg:flex-row gap-4 mb-6 items-center bg-[#0F172A]/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm relative z-40">

        {/* Search Input */}
        <div className="relative w-full lg:flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-[#0B1120] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full lg:w-auto relative">

          {/* User Filter */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[#0F172A] border border-white/10 px-5 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors shrink-0"
            >
              <Filter size={18} />
              <span className="font-medium text-sm">{selectedUser}</span>
              <ChevronDown size={18} />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-36 bg-[#0F172A] border border-white/10 rounded-xl overflow-visible shadow-lg z-9999">
                {users.map((user) => (
                  <div
                    key={user}
                    onClick={() => {
                      setSelectedUser(user);

                      setIsUserDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>


      <div className="bg-[#0f1825] backdrop-blur-md border  border-white/20 sm:p-4 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full  text-left border-collapse">
            <thead>
              <tr className="bg-[#0B1220] rounded-2xl px-3 py-7 border-b border-white/10 text-white">
                <th className="px-6 py-4 text-[16px] font-bold   ">User Name</th>
                <th className="px-6 py-4 text-[16px] font-bold   ">Email</th>
                <th className="px-6 py-4 text-[16px] font-bold   ">Role</th>
                <th className="px-6 py-4 text-center text-[16px] font-bold   ">Verification Status</th>

                <th className="px-6 py-4 text-[16px] font-bold    text-center">Status</th>
                <th className="px-6 py-4 text-[16px] font-bold    text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? <tr>
                <td colSpan={100} className="py-10">
                  <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr> : UserData?.data?.map((user: UserIfnoInterface, key: number) => (
                <tr key={key} className="hover:bg-white/5 rounded-lg transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold border border-sky-500/30">
                        {user?.fullName.charAt(0)}
                      </div>

                      <div>
                        <p className="text-white font-medium text-sm">{user?.fullName}</p>

                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className="text-[#9CA3AF] text-sm">{user?.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={` text-sm font-medium px-4 py-1 rounded-full
      ${user?.role === Role.SELLER.toUpperCase() ? 'bg-[#2B7FFF33] text-[#51A2FF]' : 'bg-[#AD46FF33] text-[#C27AFF]'}
    `}
                    >
                      {user.role}
                    </span>
                  </td>


                  <td className={`px-6 } flex  justify-center  py-4 text-[#9CA3AF] text-center text-sm`}>
                    <div className='flex items-center gap-x-3'>

                      {user?.isVerified ? <CircleCheckBig className='text-emerald-400 transition-colors' size={20} /> : <CircleX size={20} className='text-red-400' />} {user?.isVerified}

                    </div>
                  </td>


                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full border text-sm ${user?.isActive == 'INACTIVE'
                        ? "text-red-600 border-red-500"
                        : "text-green-600 border-green-500"
                        }`}
                    >
                      {user?.isActive == 'INACTIVE' ? "Inactive" : "Active"}
                    </span>
                  </td>


                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2  transition-opacity">


                      <button
                        disabled={selectId === user._id}
                        onClick={() =>
                          statusUpdateFn(
                            user._id,
                            user?.isActive === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                          )
                        }
                        className={`p-2 rounded-lg transition-colors ${user?.isActive === "ACTIVE"
                          ? "hover:bg-red-500/20 text-red-500"
                          : "hover:bg-green-500/20 text-green-500"
                          }`}
                      >
                        {selectId === user._id ? (
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        ) : user?.isActive === "ACTIVE" ? (
                          <Ban size={20} />
                        ) : (
                          <Check size={20} />
                        )}
                      </button>

                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
        <p className="text-sm text-[#9CA3AF]">
          Showing <span className="text-white font-bold">{UserData?.meta?.page}</span> to{' '}
          <span className="text-white font-bold">{UserData?.data?.length}</span> of{' '}
          <span className="text-white font-bold">{UserData?.meta?.total}</span> results
        </p>


        <div>
          <Pagination currentPage={UserData?.meta?.page} totalPages={UserData?.meta?.totalPage} onNext={onNext} onPrev={onPrev}></Pagination>
        </div>



      </div>
    </div>
  );
};

export default UserManagement;