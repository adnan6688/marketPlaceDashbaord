import { useQuery } from "@tanstack/react-query";
import { Eye, MessageCircle, Search, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { countofListing, fetchListings } from "./getListing";
import Pagination from "../../components/Pagination";
import { Debounce } from "../../components/Debounce";
import StatsCard from "./StatsCard";


export default function Listing() {

  const [page, setPage] = useState(1);

  const [sold, setSold] = useState<boolean | null>(null)
  const [isBoosted, setIsboosted] = useState<boolean | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [finalSearch, setFinalSearch] = useState<string>('')

  const debounceSarch = Debounce(search, 1000)


  useEffect(() => {
    setFinalSearch(debounceSarch)
  }, [debounceSarch])

  // v5 compatible useQuery
  const { data: listingData, isLoading, isError, error } = useQuery({
    queryKey: ["listings", page, sold, isBoosted, category, finalSearch],              // key
    queryFn: () => fetchListings(page, sold, isBoosted, category, finalSearch), // fetch function
  });

  const { data: listingCount } = useQuery({
    queryKey: ["counter"],
    queryFn: countofListing,
  });

  const getCategoryStyles = (cat: string) => {
    return cat === 'Vehicle'
      ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
      : 'bg-purple-500/10 text-purple-500 border-purple-500/20';
  };




  const onPrev = () => {
    setPage(page - 1)
  }
  const onNext = () => {
  
    setPage(page + 1)
  }

  if (isError || error) {

    return <h1>something error</h1>
  }

  return (
    <div>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 sm:gap-0 lg:gap-x-6">
        {/* {
          ListingArray?.map((item, key) => {
            return <div key={key} className=" rounded-lg px-4 py-5 bg-[#0F172A] border border-white/10  flex flex-col gap-y-3">
              <h1 className="text-sm text-white">{item?.title}</h1>
              <p className={`text-2xl font-semibold text-[${item?.colour}]`}>{item?.total}</p>
            </div>
          })
        } */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Listings" total={listingCount?.result?.total} color="blue" />
        <StatsCard title="Boosted Listings" total={listingCount?.result?.boosted} color="purple" />
        <StatsCard title="Sold Listings" total={listingCount?.result?.sold} color="green" />
        <StatsCard title="Unsold Listings" total={listingCount?.result?.unsold} color="red" />
      </div>




      <div className="flex my-3 flex-col lg:flex-row gap-4 items-center bg-[#0B1120]/80 backdrop-blur-2xl p-3 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">

        {/* 🔍 SEARCH */}
        <div className="relative w-full lg:flex-1 group">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-sky-400 transition">
            <Search size={18} />
          </span>

          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 
      focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/40
      transition-all duration-300 hover:border-white/20"
          />
        </div>

        {/* 🟢 STATUS */}
        <div className="w-full lg:w-45 relative group">
          <select onChange={(e) => {
            const val = e.target.value
            setSold(val && val == 'sold' ? true : false)
          }} className="w-full appearance-none bg-[#0A0F1C] border border-white/10 text-white rounded-xl py-3 px-4 
      focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer hover:border-white/20 transition-all">

            <option value="">All Status</option>
            <option value="available">🟢 Available</option>
            <option value="sold">🔴 Sold</option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">▾</div>
        </div>

        <div className="w-full lg:w-50 relative group">
          <select onChange={(e) => {
            const val = e.target.value
            setCategory(val && val)
          }} className="w-full appearance-none bg-[#0A0F1C] border border-white/10 text-white rounded-xl py-3 px-4 
      focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer hover:border-white/20 transition-all">

            <option value="">All Categories</option>
            <option value="services">🛠️ Services</option>
            <option value="accessories">🔧 Accessories</option>
            <option value="parts">⚙️ Parts</option>
            <option value="offroad">🏁 Offroad</option>
            <option value="cars">🚗 Cars</option>

          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">▾</div>
        </div>


        <div className="w-full lg:w-45 relative group">
          <select onChange={(e) => {
            const val = e.target.value
            setIsboosted(val && val == 'boosted' ? true : false)
          }} className="w-full appearance-none bg-[#0A0F1C] border border-white/10 text-white rounded-xl py-3 px-4 
      focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer hover:border-white/20 transition-all">

            <option value="">All Listings</option>
            <option value="boosted">🚀 Boosted</option>
            <option value="notBoosted">⚪ Not Boosted</option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">▾</div>
        </div>

        {/* ✨ CLEAR */}
        <button
          onClick={() => {
            setCategory(null)
            setIsboosted(null)
            setSold(null)
          }}
          className="w-full lg:w-auto px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
    hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95"
        >
          Clear
        </button>

      </div>
      <div className="w-full bg-[#0B1120] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="border-b border-white/5 tracking-wider bg-[#0F172A]/50">
                <th className="px-6 py-5 text-sm sm:text-[16px] font-semibold text-slate-300">Listing Title</th>
                <th className="px-6 py-5 text-sm sm:text-[16px] font-semibold text-slate-300">Sold</th>
                <th className="px-6 py-5 text-sm sm:text-[16px] font-semibold text-slate-300">Category</th>
                <th className="px-6 py-5 text-sm sm:text-[16px] font-semibold text-slate-300">Price</th>
                <th className="px-6 py-5  text-sm sm:text-[16px]  font-semibold text-slate-300">Boosted</th>
                <th className="px-6 py-5  text-sm sm:text-[16px]  font-semibold text-slate-300">Views</th>
                <th className="px-6 py-5  text-sm sm:text-[16px]  font-semibold text-slate-300">inquiryCount</th>

                <th className="px-6 py-5 text-sm sm:text-[16px] font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">

              {/* <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div> */}



              {isLoading ? <tr>
                <td colSpan={100} className="py-10">
                  <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>

                : !listingData?.data?.length ?

                  <tr>
                    <td colSpan={100} className="py-10 ">
                      <h1 className="text-center text-white">Listing Not Found!!</h1>
                    </td>
                  </tr>

                  : listingData?.data?.map((item, key) => (
                    <tr key={key} className="hover:bg-white/2 transition-colors">
                      <td
                        title={item?.title}
                        className="px-6 py-5 text-sm sm:text-base text-white font-medium max-w-50 truncate"
                      >
                        {item?.title}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[12px] font-semibold border transition
      ${item?.sold
                              ? "bg-red-500/10 text-red-400 border-red-500/30"
                              : "bg-green-500/10 text-green-400 border-green-500/30"
                            }`}
                        >
                          {item?.sold ? "Sold" : "Available"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[14px] font-semibold border ${getCategoryStyles(item?.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5  text-sm sm:text-[16px] font-bold text-white">$6{item.price}</td>
                      <td className="px-6 py-5">
                        {item?.isBoosted ? (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-400 w-fit">
                            <TrendingUp size={14} />
                            Boosted
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-400 border border-gray-600 w-fit">
                            Not Boosted
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-400">
                          {item?.viewCount ?? 0} views
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30">
                            <MessageCircle size={14} />
                            {item?.inquiryCount ?? 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-x-3">
                          <Link to={`/dashboard/listing/${item?._id}`}>
                            <button className="p-2 rounded-md hover:bg-white/10 transition group">
                              <Eye
                                size={20}
                                className="text-white group-hover:text-blue-400 transition"
                              />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>



      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2 py-4 border-t border-white/10">

        {/* Info */}
        <p className="text-sm text-slate-400 font-medium order-2 sm:order-1">
          Showing{" "}
          <span className="text-white font-semibold">
            {listingData?.meta?.page ?? 1}
          </span>{" "}
          page •{" "}
          <span className="text-white font-semibold">
            {listingData?.data?.length ?? 0}
          </span>{" "}
          items • total{" "}
          <span className="text-white font-semibold">
            {listingData?.meta?.total ?? 0}
          </span>
        </p>

        {/* Pagination */}
        <div className="order-1 sm:order-2">
          <Pagination
            onNext={onNext}
            onPrev={onPrev}
            currentPage={listingData?.meta?.page ?? 1}
            totalPages={listingData?.meta?.totalPage ?? 1}
          />
        </div>
      </div>



    </div>
  )
}
