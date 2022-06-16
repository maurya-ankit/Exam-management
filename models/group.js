import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    emails: [
        {
            type: String
        }
    ]

});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
