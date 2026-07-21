import { CircleCheck, Facebook, Menu, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { recentUsers, topListing } from "./dashboar";
import UserGrowthChart from "./UserGrowthChart";



const statsGrid = [
  {
    icon: <Users />,
    title: 'Total Users',
    count: 12845,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  }, {
    title: 'Total Listings',
    count: 3492,
    icon: <Menu />,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  },
  {
    icon: <CircleCheck />,
    title: 'Verification Requests',
    count: 324,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  },
  {
    icon: <Facebook />,
    title: 'Total Posts',
    count: 324,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  }
]




export default function Dashboard() {


  const { data: topListingInfo } = useQuery({
    queryKey: ['toplisting'],
    queryFn: topListing
  })
  const { data: userList } = useQuery({ queryKey: ['users'], queryFn: recentUsers })





  return (
    <div className="mt-5 ">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {statsGrid?.map((item, key) => (
          <div
            key={key}
            className="relative overflow-hidden group bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
          >

            <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-colors" />

            <div className="flex justify-between items-start">

              <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-[#324763] group-hover:scale-110 transition-transform duration-300">
                {item?.icon}
              </div>


              <div className={`text-[14px] flex font-bold gap-x-2 py-1 rounded-lg ${item?.parcent?.includes('-')
                ? 'bg-red-500/20 text-red-400'
                : ' text-[#05DF72]'
                }`}>
                <h1 >{item?.parcent}</h1>

                {item?.analytics}
              </div>
            </div>

            {/* Text Data */}
            <div className="mt-4">
              <p className="text-[#CBD5E1] text-[14px]   capitalize ">
                {item?.title || "Total Stats"}
              </p>
              <h3 className="text-2xl  text-white  ">
                {item?.count || "0.00"}
              </h3>
            </div>
          </div>
        ))}
      </div>




      <div className="mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Top Listings */}
          <section className="bg-linear-to-br from-[#0B1220] via-[#111827] to-[#0F172A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-white text-xl font-bold">
                Top Listings
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Best performing listings by engagement
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-150">
                <thead className="sticky top-0 bg-[#111827] z-10">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Listing
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Views
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Inquiries
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Conversion
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topListingInfo?.result?.data?.map((item: {
                    conversionRate: number,
                    inquiries: number,
                    listingTitle: string,
                    views: number
                  }, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/3 transition"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 font-bold">
                            {i + 1}
                          </div>

                          <span className="text-white font-medium">
                            {item.listingTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.views.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.inquiries.toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                          {item.conversionRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Users */}
          <section className="bg-linear-to-br from-[#0B1220] via-[#111827] to-[#0F172A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-white text-xl font-bold">
                Recent Users
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Latest registered users
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5">
                <thead className="sticky top-0 bg-[#111827] z-10">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      User
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Email
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Role
                    </th>


                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {userList?.result?.data?.map((user: {
                    avatar: string | null,
                    createdAt: string,
                    email: string
                    fcmToken: string,
                    fullName: string,
                    isActive: string,
                    isVerified: boolean,
                    role: string,
                    verifiedBadge: boolean,
                    _id: string
                  }) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/5 hover:bg-white/3 transition"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {user.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                          )}

                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                          {user.role}
                        </span>
                      </td>




                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>



      <div className="my-5">
        <UserGrowthChart></UserGrowthChart>
      </div>

    </div>
  )
}
