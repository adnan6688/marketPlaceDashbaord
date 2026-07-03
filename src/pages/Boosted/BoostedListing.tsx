import { CircleDollarSign, TrendingUp, Calendar, User } from "lucide-react";
import { Statics } from "./Statics";
import ActvieBoost from "./ActvieBoost";
import { useQuery } from "@tanstack/react-query";
import { statsofBoostedList } from "./boostedListingApi";






export default function BoostedListing() {

  const { data: statsList } = useQuery({
    queryKey: ['stats'],
    queryFn: statsofBoostedList
  })

  const boostsStats = [
    {
      title: "Active Boosts",
      total: statsList?.activeBoosts || 0,
      bg: "#1F3A5F",
      icon: <TrendingUp className="text-blue-400" />,
      text: "#51A2FF",
    },
    {
      title: "Total Revenue",
      total: statsList?.totalRevenue || 0,
      bg: "#00C95033",
      icon: <CircleDollarSign className="text-green-400" />,
      text: "#05DF72",
    },
    {
      title: "Expired Boosts",
      total: statsList?.expiredBoosts || 0,
      bg: "#F0B10033",
      icon: <Calendar className="text-amber-300" />,
      text: "#FDC700",
    },
    {
      title: "Total Boosts",
      total: statsList?.totalBoosts || 0,
      bg: "#2B7FFF33",
      icon: <User className="text-[#51A2FF]" />,
      text: "#51A2FF",
    },
  ];

  return (


    <div>

      <div className="grid mt-3 sm:mt-1  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          boostsStats?.map((item, key) => {
            return <div key={key} className={`bg-[#111827] px-4.25 py-4.25 flex flex-col gap-y-2 rounded-md border border-white/5 `}>

              <div className="flex items-center gap-x-2">

                <div className={`bg-[${item?.bg}] p-2 rounded-lg`}>{item?.icon}</div>
                <h1 className="text-white text-[16px]">{item?.title}</h1>

              </div>

              <div>
                <h1 className={`text-[${item?.text}] text-[20px]`}>${item?.total.toFixed(2)}</h1>
              </div>
            </div>
          })
        }
      </div>


      <div className="my-4 sm:my-10">
        <ActvieBoost></ActvieBoost>
      </div>

      <Statics></Statics>
    </div>
  )
}
