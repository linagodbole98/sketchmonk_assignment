import { OverviewStats } from './OverviewStats'
import { RevenueChart } from './charts/RevenueChart'
import { SalesRegionChart } from './charts/SalesRegionChart'
import { EcommercePlatformChart } from './charts/EcommercePlatformChart'
import { UsersGaugeChart } from './charts/UsersGaugeChart'
import { dashboardData } from '../constants/dashboardData'
import { NoData } from './NoData'

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">⋮</button>
    </div>
    {children}
  </div>
)

export const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Overview</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50">
            Filter
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50">
            Share
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <OverviewStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Revenue Over Time">
            <RevenueChart />
          </Card>

          <Card title="Session by Country">
            <div className="space-y-4">
              {dashboardData.sessionsByCountry.length > 0 ? (
                dashboardData?.sessionsByCountry?.map((session) => (
                  <div key={session.country} className="flex items-center gap-2">
                    <div className="w-24 sm:w-32 text-sm">{session.country}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full transition-all"
                          style={{ width: `${session.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm">{session.value}</div>
                    <div className="w-16 text-right text-sm">{session.percentage}%</div>
                  </div>
                ))
              ) : (
                <NoData message="No session data available" />
              )}
            </div>
          </Card>

          <Card title="Sales by Region">
            <div className="h-[300px]">
              {dashboardData.salesByRegion.values.some(value => value > 0) ? (
                <SalesRegionChart />
              ) : (
                <NoData message="No sales data available" />
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Sales by Platform">
              <div className="h-[300px]">
                {dashboardData.ecommercePlatform.some(item => item.percentage > 0) ? (
                  <EcommercePlatformChart />
                ) : (
                  <NoData message="No platform data available" />
                )}
              </div>
            </Card>

            <Card title="Registered Users">
              <div className="h-[300px]">
                {dashboardData.registeredUsers.total > 0 ? (
                  <UsersGaugeChart />
                ) : (
                  <NoData message="No user data available" />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
