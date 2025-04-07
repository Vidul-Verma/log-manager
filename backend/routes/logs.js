import { Router } from 'express';
import Log from '../models/Log.js';
import authMiddleware from '../middleware/authMiddleware.js';
import dayjs from 'dayjs';
import mongoose from 'mongoose';

const router = Router();

// Create a new log
router.post('/add', authMiddleware, async (req, res) => {
  const { description, eventDate, location } = req.body;
  const username = req.user.username;
  const parsedDate = dayjs(eventDate);
  if (!parsedDate.isValid()) {
    return res.status(400).json({ error: 'Invalid date format' });
  }
  const log = new Log({
    username,
    description,
    eventDate: parsedDate.toDate(),
    location,
  });

  try {
    const saveRes = await log.save();
    res.status(201).json(saveRes);
  } catch (err) {
    console.log('Error saving log:', err);
    res.status(400).json({ error: 'Invalid log data' });
  }
});

// Get all logs
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userName = req.user.username;

        const totalLogs = await Log.countDocuments({ username: userName });
        const logs = await Log.find({ username: userName })
            .sort({ eventDate: -1 }) // newest event first
            .skip(skip)
            .limit(limit);

            const totalPages = Math.ceil(totalLogs / limit);
            const hasNextPage = page < totalPages;
            res.json({
                currentPage: page,
                limit,
                totalPages,
                hasNextPage,
                logs
              });
    } catch (error) {
        console.error('Error fetching logs:', err);
        res.status(500).json({ error });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;
    try {
        const log = await Log.findOne({ _id: id, username });
        if (!log) return res.status(404).json({ error: 'Log not found' });
        res.json(log);
    }
    catch (error) {
        console.error('Error fetching log:', err);
        res.status(500).json({ error });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { description, eventDate, location } = req.body;
  const username = req.user.username;

  try {
    // Todo: Can add date parsing logic later but validators should be enough for now
     const log = await Log.findByIdAndUpdate(
      { _id: id, username },
      { description, eventDate, location },
      { new: true, runValidators: true }
    );
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    console.error('Error updating log:', err);
    res.status(400).json({ error: 'Invalid log data' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;

  try {
    const log = await Log.findByIdAndDelete({_id: id, username});
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    console.error('Error deleting log:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;