import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [DebianSalsa({
      clientId: process.env.DEBIAN_SALSA_CLIENT_ID,
      clientSecret: process.env.DEBIAN_SALSA_CLIENT_SECRET,
    })],
    callbacks: {
      async redirect({url, baseUrl}) {
          return baseUrl
      },
    }
  }),
);
