import axios from 'axios';
import { connectDB } from '../config/database';
import { seedDatabase } from '../utils/seedData';

const runSeeder = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Run the seeder directly
    await seedDatabase();
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
runSeeder();
