import { useSessionsData } from '../../api/queries';
import { NoData } from '../NoData';

export const SessionsByCountry = () => {
  const { data: sessionData, isLoading, error } = useSessionsData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !sessionData) return <NoData message="Error loading session data" />;

  return (
    <div className="space-y-4">
      {sessionData.map((session, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-24">
            <img
              src={`/flags/${session.country.toLowerCase()}.svg`}
              alt={session.country}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{session.country}</span>
          </div>
          <div className="flex-1">
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500"
                style={{ width: `${session.percentage}%` }}
              />
            </div>
          </div>
          <div className="w-16 text-right">
            <span className="text-sm font-medium">{session.value}</span>
          </div>
          <div className="w-16 text-right">
            <span className="text-sm text-gray-500">{session.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};
