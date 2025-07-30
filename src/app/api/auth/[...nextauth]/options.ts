import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import bcryptjs from "bcryptjs";

export const auhtOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",

            credentials: {
                identifier: {label: "Email", type: "text", placeholder: "you@example.com"},
                password: {label: "Password", type: "password"}
            },

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try{
                    const user = await userModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                    if(!user) throw new Error("User is not registered with this email");
                    if(!user.isVerified) throw new Error("Please verify your account before login");

                    const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);
                    if(isPasswordCorrect) return user;
                    else throw new Error("Password is incorrect. Please enter valid password");

                }
                catch(error: unknown){
                    console.log("Something went wrong while sign in");
                    if(error instanceof Error){
                        throw new Error(error.message);
                    }
                    else{
                        throw new Error("An unknown error");
                    }
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }){
            if(user){
                token._id = user._id;
                token.username = user.username;
                token.isVerified = user.isVerified;
            }

            return token;
        },
        async session({ session, token }){
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }

            return session;
        }
    },

    pages: {
        signIn: "/sign-in"
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },

    secret: process.env.NEXTAUTH_SECRET,
}