import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, default: 'NO PASSWORD - signup by Google' },
    email: { type: String, required: true },
    address: { type: String, default: "Нет доступа" },
    verifyCode: { type: String, default: 'NO CODE - signup by Google' },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    discountCard: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // ссылка на отзывы
});

const User = mongoose.model('User', userSchema);
export default User;