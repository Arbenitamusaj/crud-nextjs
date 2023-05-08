import User from "../../model/User";
import dbConnect from "../../lib/dbConnect";
export default async function handler(req, res) {
  try {
    const conn = await dbConnect();
    const { id } = req.query;

    // check if user with given id exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // delete the user
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
