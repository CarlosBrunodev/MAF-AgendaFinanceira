import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import api from '../../../services/api';

export default NextAuth({
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Usuario" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
        const user = await api.post("/getLogin",{username:credentials.username,password: credentials.password});
          return Promise.resolve({
            id: user.data.data[0].user_id,
            name: user.data.data[0].user_name,
            email: user.data.data[0].user_email,
          });
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {

    jwt: async (token, user, account, profile, isNewUser) => {
     
      user && (token.user = user);
      return Promise.resolve(token)   // ...here
  },
 
    session: async (session, user, sessionToken) => {
    
      session.user = user.user;
      return Promise.resolve(session)
  }
  }
});
