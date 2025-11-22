import type { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

import { HTMLAttributes } from "react";

declare global {
  type IComponentProps<E = HTMLElement> = HTMLAttributes<E>;
}

declare module "next-auth" {
  interface User {
    access_token: string;
    nome: string;
    descricao: string;
    login: string;
    expires_on: number;
    nivel: string;
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nivel?: string;
    access_token?: string;
    nome?: string;
    descricao?: string;
    login?: string;
    expires_on?: number;
  }
}
