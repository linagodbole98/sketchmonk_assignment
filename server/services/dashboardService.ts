import { Revenue } from '../models/Revenue';
import { Session } from '../models/Session';
import { SalesRegion } from '../models/SalesRegion';
import { EcommercePlatform } from '../models/EcommercePlatform';
import { User } from '../models/User';

export class DashboardService {
  async getDashboardData() {
    try {
      // Get current date for calculations
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      const previousThirtyDays = new Date(now.setDate(now.getDate() - 30));

      // Get overview metrics
      const [
        currentRevenue,
        previousRevenue,
        currentViews,
        previousViews,
        currentConversions,
        previousConversions
      ] = await Promise.all([
        Revenue.aggregate([
          { $match: { month: { $gte: thirtyDaysAgo } } },
          { $group: { _id: null, total: { $sum: '$totalRevenue' } } }
        ]),
        Revenue.aggregate([
          { $match: { month: { $gte: previousThirtyDays, $lt: thirtyDaysAgo } } },
          { $group: { _id: null, total: { $sum: '$totalRevenue' } } }
        ]),
        Session.aggregate([
          { $match: { date: { $gte: thirtyDaysAgo } } },
          { $group: { _id: null, total: { $sum: '$value' } } }
        ]),
        Session.aggregate([
          { $match: { date: { $gte: previousThirtyDays, $lt: thirtyDaysAgo } } },
          { $group: { _id: null, total: { $sum: '$value' } } }
        ]),
        User.countDocuments({ registeredDate: { $gte: thirtyDaysAgo } }),
        User.countDocuments({ registeredDate: { $gte: previousThirtyDays, $lt: thirtyDaysAgo } })
      ]);

      // Calculate percentage changes
      const revenueChange = this.calculatePercentageChange(
        currentRevenue[0]?.total || 0,
        previousRevenue[0]?.total || 0
      );
      const viewsChange = this.calculatePercentageChange(
        currentViews[0]?.total || 0,
        previousViews[0]?.total || 0
      );
      const conversionChange = this.calculatePercentageChange(
        currentConversions,
        previousConversions
      );

      // Get revenue over time
      const revenueOverTime = await Revenue.aggregate([
        { $sort: { month: 1 } },
        { $limit: 8 },
        {
          $project: {
            month: { $dateToString: { format: '%b %Y', date: '$month' } },
            totalRevenue: 1,
            totalTarget: 1
          }
        }
      ]);

      // Get sessions by country
      const sessionsByCountry = await Session.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: '$country',
            value: { $sum: '$value' },
            percentage: { $avg: '$percentage' }
          }
        },
        { $sort: { value: -1 } },
        { $limit: 4 }
      ]);

      // Get sales by region
      const salesByRegion = await SalesRegion.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: '$region',
            value: { $sum: '$value' }
          }
        }
      ]);

      // Get ecommerce platform data
      const ecommercePlatform = await EcommercePlatform.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: '$platform',
            percentage: { $avg: '$percentage' }
          }
        }
      ]);

      // Get user statistics
      const [totalUsers, premiumUsers] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ type: 'premium' })
      ]);

      return {
        overview: {
          totalIncome: {
            value: currentRevenue[0]?.total || 0,
            percentageChange: revenueChange,
            trend: revenueChange >= 0 ? 'up' : 'down'
          },
          totalViews: {
            value: currentViews[0]?.total || 0,
            percentageChange: viewsChange,
            trend: viewsChange >= 0 ? 'up' : 'down'
          },
          conversionRate: {
            value: (currentConversions / (currentViews[0]?.total || 1)) * 100,
            percentageChange: conversionChange,
            trend: conversionChange >= 0 ? 'up' : 'down'
          }
        },
        revenueOverTime: {
          months: revenueOverTime.map(r => r.month),
          totalRevenue: revenueOverTime.map(r => r.totalRevenue),
          totalTarget: revenueOverTime.map(r => r.totalTarget)
        },
        sessionsByCountry: sessionsByCountry.map(s => ({
          country: s._id,
          value: s.value,
          percentage: s.percentage
        })),
        salesByRegion: {
          regions: salesByRegion.map(s => s._id),
          values: salesByRegion.map(s => s.value)
        },
        ecommercePlatform: ecommercePlatform.map(e => ({
          platform: e._id,
          percentage: e.percentage
        })),
        registeredUsers: {
          total: totalUsers,
          premium: premiumUsers,
          basic: totalUsers - premiumUsers
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }
}

export const dashboardService = new DashboardService();
