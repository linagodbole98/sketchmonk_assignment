import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboardService';

export class DashboardController {
  async getDashboardData(req: Request, res: Response) {
    try {
      const data = await dashboardService.getDashboardData();
      res.json(data);
    } catch (error) {
      console.error('Error in dashboard controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateDashboardData(req: Request, res: Response) {
    try {
      // Here you can add logic to update specific dashboard data
      // This would involve updating individual collections based on the request body
      res.status(200).json({ message: 'Dashboard data updated successfully' });
    } catch (error) {
      console.error('Error updating dashboard data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const dashboardController = new DashboardController();
