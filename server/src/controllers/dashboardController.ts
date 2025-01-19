import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboardService';
import { seedDatabase } from '../utils/seedData';

class DashboardController {
  async getDashboardData(req: Request, res: Response) {
    try {
      const data = await dashboardService.getDashboardData();
      res.json(data);
    } catch (error) {
      console.error('Error in dashboard controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async seedData(req: Request, res: Response) {
    try {
      await seedDatabase();
      res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Error seeding database:', error);
      res.status(500).json({ error: 'Error seeding database' });
    }
  }
}

export const dashboardController = new DashboardController();
