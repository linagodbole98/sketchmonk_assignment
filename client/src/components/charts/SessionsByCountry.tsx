import { useSessionsData } from "../../api/queries";
import { NoData } from "../NoData";
import { Images } from "@/utils/constant";
import { MapChartSkeleton } from '../skeletons/ChartSkeletons';

export const SessionsByCountry = () => {
  const { data: sessionData, isLoading, error } = useSessionsData();

  if (isLoading) return <MapChartSkeleton />;
  if (error || !sessionData)
    return <NoData message="Error loading session data" />;

  return (
    <div className="space-y-4">
      {sessionData.map((session, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-10">
            <img
              src={Images[session.country]}
              alt={session.country}
              className="w-6 h-6 rounded-full"
            />
            {/* <BsGlobeAsiaAustralia  className="mr-2 text-emerald-600 border-2 border-gray-400 p-1 rounded-full bg-slate-100" /> */}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{session.country}</span>

              <div className="flex flex-1 justify-end">
                <div className="text-end pr-2">
                  <span className="text-sm font-medium">{session.value}</span>
                  <span className="text-sm text-gray-500">
                    {" • "}
                    {session.percentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div
                className="absolute top-0 left-0 h-full bg-[#287F71]"
                style={{ width: `${session.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
