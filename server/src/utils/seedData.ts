import { Revenue, Session, SalesRegion, EcommercePlatform, User } from '../models';
import mongoose from 'mongoose';

const generateRevenueData = () => {
  const months = ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'];
  return months.map((month, index) => ({
    month: new Date(month),
    totalRevenue: 20000 + (index * 1500) + Math.random() * 1000,
    totalTarget: 20000 + (index * 2000),
  }));
};

const generateSessionData = () => {
  const countries = ['Australia', 'Indonesia', 'Thailand', 'Germany', 'France'];
  return countries.map(country => ({
    country,
    value: 400 + Math.floor(Math.random() * 200),
    percentage: 5 + Math.random() * 7,
    date: new Date(),
  }));
};

const generateSalesRegionData = () => {
  const regions = ['Australia', 'Africa', 'Europe', 'Antarctica', 'Asia'];
  return regions.map(region => ({
    region,
    value: 1800 + Math.floor(Math.random() * 1200),
    date: new Date(),
  }));
};

const generateEcommercePlatformData = () => {
  const platforms = ['Amazon', 'Tokopedia', 'Alibaba'];
  return platforms.map(platform => ({
    platform,
    percentage: 25 + Math.floor(Math.random() * 25),
    sales: 10000 + Math.floor(Math.random() * 5000),
    date: new Date(),
  }));
};

const generateUserData = () => {
  const users = [];
  for (let i = 0; i < 2324; i++) {
    users.push({
      email: `user${i}@example.com`,
      type: i < 1809 ? 'premium' : 'basic',
      registeredDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
    });
  }
  return users;
};

export const seedDatabase = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Revenue.deleteMany({}),
      Session.deleteMany({}),
      SalesRegion.deleteMany({}),
      EcommercePlatform.deleteMany({}),
      User.deleteMany({}),
    ]);

    // Insert new data
    await Promise.all([
      Revenue.insertMany(generateRevenueData()),
      Session.insertMany(generateSessionData()),
      SalesRegion.insertMany(generateSalesRegionData()),
      EcommercePlatform.insertMany(generateEcommercePlatformData()),
      User.insertMany(generateUserData()),
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
