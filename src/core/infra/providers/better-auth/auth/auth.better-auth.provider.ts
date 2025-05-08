import { injectable } from "inversify";
import { auth as batterAuth } from '@/lib/auth'
import type { IAuthBetterAuthProvider } from "@/core/domain/providers/better-auth/auth.better-auth.interface";

@injectable()
export class AuthBetterAuthProvider implements IAuthBetterAuthProvider {
    async signinEmailAndPassword(email:string, password:string){ 
      return await batterAuth.api.signInEmail({
        body: {
          email,
          password,
        },
      })    
    }
}