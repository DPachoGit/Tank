import User from '../models/user.js';

const register = async (req, res) => {
    const { user, hitNumber, faultNumber } = req.body;
    try {
        let existingUser = await User.findOne({ user });

        if (existingUser) {
            let updatedFields = {};

            if ((hitNumber - faultNumber) > (existingUser.hitNumber - existingUser.faultNumber)) {
                updatedFields.hitNumber = hitNumber;
                updatedFields.faultNumber = faultNumber;
            }

            if (Object.keys(updatedFields).length > 0) {
                await User.updateOne({ user }, { $set: updatedFields });
            }

            return res.status(200).json({ message: 'User updated' });
        }

        const result = await User.create({ user, hitNumber, faultNumber });
        console.log(result)
        return res.status(200).json(result)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { _id: 0, __v: 0 });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getUser = async (req, res) => {
    const { user } = req.query;
    try {
        const existingUser = await User.findOne({ user }, { _id: 0, __v: 0 });

        if (existingUser) {
            return res.status(200).json(existingUser);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


export default { 
    register,
    getUsers,
    getUser,
 };