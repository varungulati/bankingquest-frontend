import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    console.log(process.env.GOOGLE_CLIENT_SECRET,'======process.env.GOOGLE_CLIENT_SECRET')
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
})
console.log(handler,'=====handler')
export { handler as GET, handler as POST }