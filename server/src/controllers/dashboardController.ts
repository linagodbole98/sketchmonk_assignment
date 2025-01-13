import { Request, Response } from 'express';
import Dashboard, { IDashboard } from '../models/Dashboard';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().sort({ createdAt: -1 });
    if (!dashboardData) {
      res.status(404).json({ message: 'No dashboard data found' });
      return;
    }
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};

export const updateDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedData = await Dashboard.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dashboard data', error });
  }
};

export const getOverviewStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('overview');
    if (!dashboardData) {
      res.status(404).json({ message: 'No overview stats found' });
      return;
    }
    res.json(dashboardData.overview);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overview stats', error });
  }
};

export const getRevenueData = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('revenueOverTime');
    if (!dashboardData) {
      res.status(404).json({ message: 'No revenue data found' });
      return;
    }
    res.json(dashboardData.revenueOverTime);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue data', error });
  }
};

export const getSessionsByCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('sessionsByCountry');
    if (!dashboardData) {
      res.status(404).json({ message: 'No sessions data found' });
      return;
    }
    res.json(dashboardData.sessionsByCountry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions data', error });
  }
};

export const getSalesByRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('salesByRegion');
    if (!dashboardData) {
      res.status(404).json({ message: 'No sales data found' });
      return;
    }
    res.json(dashboardData.salesByRegion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales data', error });
  }
};

export const getEcommercePlatformData = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('ecommercePlatform');
    if (!dashboardData) {
      res.status(404).json({ message: 'No platform data found' });
      return;
    }
    res.json(dashboardData.ecommercePlatform);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching platform data', error });
  }
};

export const getUserStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await Dashboard.findOne().select('registeredUsers');
    if (!dashboardData) {
      res.status(404).json({ message: 'No user stats found' });
      return;
    }
    res.json(dashboardData.registeredUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user stats', error });
  }
};
