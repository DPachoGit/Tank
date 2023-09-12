import connection from '../db/mongoose.js';

const UserSchema = new connection.Schema({
    user: {
        type: String,
        required: false,
        unique: true,
    },
    hitNumber: {
        type: Number,
        required: false,
    },
    faultNumber: {
        type: Number,
        required: false,
    },
});

const User = connection.model('User', UserSchema);

export default User;
