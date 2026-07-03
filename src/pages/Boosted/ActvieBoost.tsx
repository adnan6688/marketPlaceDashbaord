import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { activeBoostedData } from './boostedListingApi';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

interface Listing {
  id: number;
  title: string;
  durationDays: number;
  startAt: string;
  endAt: string;
  price: string;
  listing: {_id: string, title: string, price: number, viewCount: number, id: string}
  user: { _id: string, fullName: string },
  createdAt : string,
  productId : string,
  name : string,
  _id : string
}




const ActvieBoost: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);


  const { data: activeBoostList, isLoading , isError } = useQuery({
    queryKey: ['active-boosted', currentPage],
    queryFn: () => activeBoostedData(currentPage)
  })



  const page = activeBoostList?.meta?.page || 1;
  const limit = activeBoostList?.meta?.limit || 10;
  const total = activeBoostList?.meta?.total || 0;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const onPrev = () => {
    setCurrentPage(currentPage - 1)
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }


  if(isLoading){
    return <div>
      <Loading></Loading>
    </div>
  }
  if(isError){
    return <div className='min-h-screen flex justify-center items-center'>
      <p className='text-center text-red-500'>something error</p>
    </div>
  }


  return (
    <div className=" bg-[#0a0f1c]    text-gray-200">
      <div className="">
        <h2 className="mb-6 text-xl font-semibold text-white">Active Boosted Listings</h2>

        <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#0f172a] shadow-2xl">

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-black border-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Listing Title</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">User</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Duration</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Start Date</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">End Date</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Description</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider text-right">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {activeBoostList?.data?.map((item : Listing) => (
                  <tr key={item._id} className="transition-colors hover:bg-white/5">
                    <td className="flex items-center gap-3 px-6 py-5 font-bold text-white whitespace-nowrap">
                      <TrendingUp className='text-blue-900' />
                      {item.listing?.title}
                    </td>
                    <td className="px-6 py-5 text-gray-300">{item?.user?.fullName}</td>
                    <td className="px-6 py-5 text-gray-300">{item?.durationDays} days</td>
                    <td className="px-6 py-5 text-gray-300">{new Date(item.startAt).toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-gray-300">{new Date(item?.endAt).toLocaleDateString()}</td>
                    <td className="px-6 py-5 font-bold text-white">{item.name}</td>
                    <td className="px-6 py-5 font-bold text-white">{item.price}$</td>
                    <td className="px-6 py-5 text-white text-right">{item.listing?.viewCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="md:hidden divide-y divide-gray-800">
            {activeBoostList?.data?.map((item : Listing) => (
              <div key={item._id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <svg className="h-4 w-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {item.listing?.title}
                  </div>
                  {/* <StatusBadge status={item.paymentStatus} /> */}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div><span className="text-gray-600">User:</span> {item.user.fullName}</div>
                  <div className="text-right"><span className="text-gray-600">Views:</span> {item.listing.viewCount}</div>
                  <div><span className="text-gray-600">Start:</span>{new Date(item.startAt).toLocaleDateString()}</div>
                  <div className="text-right font-semibold text-white">price: {item.price}$</div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex items-center justify-between border-t border-gray-800 bg-[#0f172a] px-6 py-4">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="text-gray-300">{startItem}</span> to{" "}
              <span className="text-gray-300">{endItem}</span> of{" "}
              <span className="text-gray-300">{total}</span> results
            </p>
            <div className="flex gap-2">
              <Pagination onNext={nextPage} onPrev={onPrev} currentPage={currentPage} totalPages={activeBoostList?.meta?.totalPages} ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ActvieBoost;