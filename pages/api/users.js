import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";

export default async function handler(req, res) {
  try {
    const conn = await dbConnect();
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
