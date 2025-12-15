import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/constants/enverioments";

function toFormData(obj: Record<string, any>) {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

export default {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        try {
          const res = await fetch(API_URL + "v1/usuario/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: toFormData(payload),
          });

          const json = await res.json();
          if (res.ok && json?.res?.access_token) {
            return json.res;
          }
          console.error("Auth failed:", json);
          return null;
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/log-in",
    signOut: "/log-in",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.nome = user.nome;
        token.login = user.login;
        token.descricao = user.descricao;
        token.nivel = user.nivel;
        token.unidade_id = user.unidade_id;
        token.unidade_nome = user.unidade_nome;
        token.entidade_id = user.entidade_id;
        token.entidade_nome = user.entidade_nome;

        if (user.expires_on) {
          token.expires_on = Math.floor(
            new Date(user.expires_on).getTime() / 1000
          );
        }
      }

      if (token.expires_on && Date.now() / 1000 > token.expires_on) {
        console.log("🔒 Token expirado — limpando JWT.");
        return {};
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        access_token: token.access_token!,
        nome: token.nome!,
        nivel: token.nivel!,
        login: token.login!,
        descricao: token.descricao!,
        expires_on: token.expires_on!,
        email: "",
        id: "",
        emailVerified: null,
        entidade_id: token.entidade_id!,
        entidade_nome: token.entidade_nome!,
        unidade_id: token.unidade_id!,
        unidade_nome: token.unidade_nome!,
      };

      return session;
    },
  },
} satisfies NextAuthConfig;
