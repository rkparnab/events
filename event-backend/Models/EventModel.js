
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({

title:{type:String, required:true},

description:{type:String, required:true},

date:{type:String, required:true},

time:{type:String, required:true},

location:{type:String, required:true},

category:{type:String, required:true},

createdBy:{ type: mongoose.Schema.Types.ObjectId,ref:'UserModel' },

}, {timestamps:true, versionKey:false}

);


const EventModel = mongoose.model("events", EventSchema);

export default EventModel;