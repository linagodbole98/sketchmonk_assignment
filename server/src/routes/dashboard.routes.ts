// import express from 'express';
// import { Dashboard } from '../models/dashboard.model';
// import { dashboardValidation } from '../validations/dashboard.validation';
// import validate from '../middleware/validate';

// const router = express.Router();

// // Get user's dashboard layout
// router.get('/:userId', async (req, res) => {
//   try {
//     const dashboard = await Dashboard.findOne({ userId: req.params.userId });
//     res.json(dashboard || { widgets: [] });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching dashboard layout' });
//   }
// });

// // Update dashboard layout
// router.put('/:userId', validate(dashboardValidation.updateLayout), async (req, res) => {
//   try {
//     const dashboard = await Dashboard.findOneAndUpdate(
//       { userId: req.params.userId },
//       { 
//         widgets: req.body.widgets,
//         lastModified: new Date()
//       },
//       { new: true, upsert: true }
//     );
//     res.json(dashboard);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating dashboard layout' });
//   }
// });

// export default router;
