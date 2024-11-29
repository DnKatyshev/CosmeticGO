// Node
import { Request, Response } from "express";

// Services
import userService from "../services/userService";

// Types
import { UserSignUpSchema, VerifyCodeSchema, UserSignInSchema } from "../types/ZodSchemas";


class UserController{

    async signUp(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(UserSignUpSchema.safeParse(req.body).success){

                const result = await userService.signUp(req.body)

                // Если переданные данные УЖЕ есть в БД - возвращаем 403-статус (запрещаем регистрацию, пусть логинится)
                if(!result){
                    console.log('Регистрация не возможна - пользователь уже существует!')
                    res.status(409).json({
                        message: 'Регистрация не возможна - пользователь уже существует!'
                    });

                } else {
                    res.status(200).json({
                        message: 'Пользователь успешно зарегистрирован, код отправлен на почту!'
                    });
                }

            } else{
                res.status(400).json({ message: 'Invalid UserSignUP-data!' });
                console.log('ZOD-Error in SignUp-controller!')
                return
            }

        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async signUpVerifyCode(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(VerifyCodeSchema.safeParse(req.body).success){

                const {verifyCode} = req.body
                const result = await userService.sugnUpVerifyCode(verifyCode)

                // Если переданные данные УЖЕ есть в БД - возвращаем 403-статус (запрещаем регистрацию, пусть логинится)
                if(!result){
                    res.status(403).json({
                        message: 'Введённый код верификации не верный!'
                    });
                } else {
                    res.status(200).json({
                        message: 'Код верификации правильный!'
                    });
                }



            } else{
                res.status(400).json({ message: 'Invalid verify-code!' });
                console.log('ZOD-Error in signUpVerifyCode-controller!')
            }
        }

        catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }

    async signIn(req:Request, res:Response) {
        try {
            // Делаем валидацию в runtime через ZOD
            if(UserSignInSchema.safeParse(req.body).success){
    
                const result = await userService.signIn(req.body)
                if(!result){
                    res.status(403).json({
                        message: 'Неверный логин/пароль или такого аккаунта нет!'
                    });
                } else {

                    res.status(200).json({
                        result,
                        message: 'Пользователь успешно вошёл!'
                    });
                }

            } else{
                res.status(400).json({ message: 'Invalid UserSignIN-data!' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }


    async changeDiscountStatus(req:Request, res:Response) {
        try {
            const {username} = req.body
            const result = await userService.changeDiscountStatus(username)

            res.status(200).json({
                result,
                message: 'Поле changeDiscountStatus для этого пользователя - теперь "true"!'
            });

        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    }


    async getProfileInfo(req:Request, res:Response) {
        try {
            const {username} = req.body
            const result = await userService.getProfileInfo(username)

            res.status(200).json({
                result,
                message: 'Информация о пользователе через его документ получена!'
            });

        } catch (error) {
           res.status(500).json({ message: 'Server Error', error });
        }
    }


    async setAddress(req:Request, res:Response) {
        try {
            const {username, exactAddress} = req.body
            const result = await userService.setAddress(username, exactAddress)

            res.status(200).json({
                result,
                message: 'Адрес пользователя успешно изменён!'
            });

        } catch (error) {
           res.status(500).json({ message: 'Server Error', error });
        }
    }

}

export default new UserController()