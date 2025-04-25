
import EventModel from '../Models/EventModel.js';


export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find({}).sort({ createdAt: -1 });

    return res.status(200).json({success: true,message: "All Events",events,
    });
  } catch (error) {
    console.error("Error fetching events:", error); 
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};




export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event retrieved successfully',
      event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve event',
      error: error.message,
    });
  }
};




export const createEvent = async (req, res) => {
  const { title, description, date, time, location, category } = req.body;

  if (!title || !description || !date || !time || !location || !category) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy: req.user._id, 
    });

    const savedEvent = await newEvent.save();
    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: savedEvent,
    });

  } catch (error) {
    console.error('Error creating event:', error); 
    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
};




export const updateEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};




export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();

    res.json({ message: 'Event deleted successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
};
