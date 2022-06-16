import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import Group from '../../../../models/group';
import Student from '../../../../models/students';

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
    const groups = await Group.find({});
    response.status(200).json(groups);
});
handler.post(async (request, response) => {
    try {
        const group = await Group.create(request.body);
        // Process a POST request
        response.status(201).json({ success: true, data: group });
    } catch (error) {
        response.status(400).json({ success: false, error: error });
    }
});

export default handler;
