import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePics: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
        default: ''
    }
});

export const UserModel =  mongoose.model('User', UserSchema);

export const getUserByEmail =  (email:string) =>  UserModel.findOne({email});
export const getUserById =  (id:string) => UserModel.findById(id);
export const createUser =  (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const UpdateUserById =  (id:string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, {new: true});
export const UpdateUserByEmail = (email:string, values: Record<string, any>) => UserModel.findOneAndUpdate({email}, values, {new: true});