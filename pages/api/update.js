import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";

export default async function handler(req, res) {
  const { id } = req.query;
  const { name, email, gender } = req.body.data;
  const conn = await dbConnect();

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, gender },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
