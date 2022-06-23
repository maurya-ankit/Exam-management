import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import Newsfeed from '../../../../models/newsfeed';

const handler = nc({
    onError: (error, request, response) => {
        console.error(error.stack);
        response.status(500).end('Something broke!');
    },
    onNoMatch: (request, response) => {
        response.status(404).end('Page is not found');
    }
});

handler.use(async (request, response, next) => {
    await databaseConnect();
    next();
});

handler.get(async (request, response) => {
    const { slug } = request.query;
    const newsfeed = await Newsfeed.findById(slug);
    response.status(200).json(newsfeed);
});

handler.patch(async (request, response) => {
    const { slug } = request.query;
    try {
        let body = { ...request.body };
        delete body._id;
        const newsfeed = await Newsfeed.findOneAndUpdate(
            {
                _id: slug,
            },
            body
        );
        // Process a POST request
        response.status(201).json({ success: true, data: newsfeed });
    } catch (error) {
        response.status(400).json({ success: false, error: error });
    }
});

handler.delete(async (request, response) => {
    const { slug } = request.query;
    try {
        const newsfeed = await Newsfeed.findOneAndDelete({
            _id: slug
        });
        // Process a POST request
        response.status(201).json({ success: true, data: newsfeed });
    } catch (error) {
        response.status(400).json({ success: false, error: error });
    }
});

export default handler;
