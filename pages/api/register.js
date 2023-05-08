import dbConnect from '../../lib/dbConnect';
import User from '../../model/User';
export default async function handler(req, res) {
  try {
    const conn = await dbConnect();

    const { data } = req.body;


    const user = await User.create({
      ...data,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
