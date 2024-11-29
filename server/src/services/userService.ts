import User from "../model/userModel"
import bcrypt from 'bcrypt'
import { TSignUpUser, TSignInUser } from "../types/types"

class UserService{

    async signUp(signUpData:TSignUpUser){

        console.log('signUpData: ', signUpData)

        // проверяем - есть ли УЖЕ данные пользователя в БД. Если есть - отменяем регистрацию
        const userIsExist = await User.find({
            $or: [
                { username: signUpData.username },
                { password: signUpData.password },
                { email: signUpData.email }
            ]
        })
        if(userIsExist.length > 0) {
            console.log('Регистрация не нужна - пользователь уже существует!')
            return false
        }

        // Если переданных данных НЕТ в БД - значит всё ок, регестрируем нового пользователя (создаём документ в БД)
        // также делаем проверку пароля - если он есть в переданных данных - регистрация через "credentials", если нет - через Google
        if(signUpData.password){
            const hashedPassword = await bcrypt.hash(signUpData.password, 3)
            const mainSignUpData = {
                ...signUpData,
                password: hashedPassword,
                verifyCode: signUpData.verifyCode,
            }
            const newUser = new User(mainSignUpData)
            await newUser.save()

        } else {
            const mainSignUpData = {
                ...signUpData,
                verified: true
            }
            const newUser = new User(mainSignUpData)
            await newUser.save()
        }
    }

    async sugnUpVerifyCode(verifyCode:string){
        const updatedDocument = await User.findOneAndUpdate(
            { verifyCode }, // Поиск по полю verifyCode
            { verified: true }, // Обновление поля verified с false на true
            { new: true } // Возвращает обновленный документ
        );
        return updatedDocument;
    }


    async signIn(signInData:TSignInUser){

        console.log('signInData: ', signInData)

        const {username} = signInData
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Пользователь не найден!");
            return false;
        }

        // Проверка - если в данных передан password - значит вход через Credentials. Если email - через Google
        if(signInData.password){
            const isPasswordValid = await bcrypt.compare(signInData.password, user.password)
            if (!isPasswordValid) {
                console.log("Неверный пароль!");
                return false;
            }
        }

        if(signInData.email){
            const {email} = signInData
            const user = await User.findOne({ email });
            console.log('Вход через Google!!!')
            if (!user) {
                console.log("Пользователь не найден по email через Googgle-provider!");
                return false;
            }
        }

        user.updatedAt = new Date();
        await user.save();

        console.log("Успешный вход:", user);
        return user;
    }


    async changeDiscountStatus(username:string){
        const updatedDocument = await User.findOneAndUpdate(
            { username },
            { discountCard: true },
            { new: true } 
        );
    
        if (updatedDocument) {
            console.log("Поле discountCard обновленo:", updatedDocument);
            return updatedDocument
        } else {
            console.log("Документа с таким username не найденo");
            return false
        }
    }


    async getProfileInfo(username:string){

        const user = await User.findOne({ username });
        if (!user) {
            console.log("Пользователь не найден!");
            return false;
        }

        return user;
    }


    async setAddress(username:string, exactAddress:string){

        const updatedDocument = await User.findOneAndUpdate(
            { username },
            { address: exactAddress },
            { new: true } 
        );

        console.log('Аргументы для адреса: ', username, exactAddress)
    
        if (updatedDocument) {
            console.log("Поле address обновленo:", updatedDocument);
            return updatedDocument
        } else {
            console.log("Документа с таким username не найденo");
            return false
        }
    }

}

export default new UserService();