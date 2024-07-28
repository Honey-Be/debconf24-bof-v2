import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    secret: import.meta.env.AUTH_SECRET,
    trustHost: true,
    providers: [DebianSalsa({
      clientId: import.meta.env.DEBIAN_SALSA_CLIENT_ID,
      clientSecret: import.meta.env.DEBIAN_SALSA_CLIENT_SECRET,
    })],
    callbacks: {
      async redirect({url, baseUrl}) {
          return url
      },
    }
  }),
);
