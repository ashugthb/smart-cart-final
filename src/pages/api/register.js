import User from '../../../src/app/models/user';
import dbConnect from '../../lib/dbConnect'; // You need to create this for DB connection

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { username, password, isManager } = req.body;
            const newUser = await User.create({ username, password, isManager });
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
