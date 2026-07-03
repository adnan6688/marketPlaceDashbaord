import { Statics } from "../Boosted/Statics";
import UserGrowthChart from "../Dashboard/UserGrowthChart";

export default function Analytics() {
  return (
    <div className="flex flex-col gap-5">


      <UserGrowthChart></UserGrowthChart>


      <Statics></Statics>
    </div>
  )
}
