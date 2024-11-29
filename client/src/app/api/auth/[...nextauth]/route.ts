// next-auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// server-actions
import { signUpAction, signInAction } from "@/app/actions";

import { TRegisterForm } from "@/components/business/registerForm/register-form";


const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
                role: { label: "role", type: "text" },
                email: { label: "email", type: "email" },
            },
            authorize: async (credentials) => {
                try {
                    // Проверяем наличие всех обязательных параметров
                    if (!credentials?.username || !credentials?.password) {
                        console.error('Missing required credentials.');
                        return null;
                    }
            
                    const user = {
                        username: credentials.username,
                        password: credentials.password,
                        email: credentials.email,
                        role: credentials.role,
                    };
            
                    return user; // Возвращаем объект пользователя

                } catch (error) {
                    return null; // Возвращаем null в случае ошибки
                }
            }
            
        })
    ],
    callbacks: {
        // Заипись пользователя в БД при регистрации через Google
        async signIn({ account, profile } : { account: any; profile: { name: string; email: string } }) {
            if (account.provider === 'google') {

                const signUpStatus = await signUpAction({
                    username: profile.name,
                    email: profile.email,
                });
                if(signUpStatus.status === 200){
                    return signUpStatus;
                }

                if(signUpStatus.status === 409){
                    const signInStatus = await signInAction({username: profile.name, email: profile.email})
                    return signInStatus.status
                }

            // Провайдеры, отличные от Google    
            } else {
                return true;
            }
            
        },

        // Эти коллбеки нужны для добавления данных из authorize() в NextAuth-сессию
        // Коллбек для JWT - записываем данные в токен
        async jwt({ token, user } : {token:any, user:TRegisterForm}) {
            console.log('=>User in JWT-callback=>', user)
            if (user) {
                token.username = user.username;
                token.password = user.password;
                token.role = user.role;
                token.email = user.email;
            }
            console.log('JWT', token)
            return token;
        },
        // Коллбек для сессии - переносим данные из токена в сессию
        async session({ token, session } : {token:any, session:any}) {
            console.log('=>Token in SESSION-callback=>', token)
            if(token){
                session.user.username = token.username;
                session.user.password = token.password;
                session.user.role = token.role;
                session.user.email = token.email;
            }
            console.log('SESSION', session)
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };