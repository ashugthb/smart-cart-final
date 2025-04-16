import User from '../../app/models/user';
import dbConnect from '../../lib/dbConnect';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { username, password, name, role } = req.body;

        try {
            if (name) { // Registration flow
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return res.status(400).json({ success: false, error: 'Username already exists' });
                }

                const user = await User.create({
                    name,
                    username,
                    password,
                    role: role || 'user'
                });

                const token = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return res.status(201).json({ success: true, token, role: user.role });
            } else { // Login flow
                const user = await User.findOne({ username });
                if (!user) {
                    return res.status(401).json({ success: false, error: 'Invalid credentials' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ success: false, error: 'Invalid credentials' });
                }

                const token = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return res.status(200).json({ success: true, token, role: user.role });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
}