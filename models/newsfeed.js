import mongoose from 'mongoose';

const NewsfeedSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true
    },
    seen: [
        {
            type: String
        }
    ],
    postedAt: {
        type: String,
        required: true
    },
    comments: [
        {
            comment: {
                type: String
            },
            by: {
                type: String
            },
            at: {
                type: String
            }
        }
    ]

});

export default mongoose.models.Newsfeed || mongoose.model('Newsfeed', NewsfeedSchema);
