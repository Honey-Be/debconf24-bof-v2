import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [DebianSalsa({
      clientId: import.meta.env.DEBIAN_SALSA_CLIENT_ID,
      clientSecret: import.meta.env.DEBIAN_SALSA_CLIENT_SECRET,
    })],
  }),
);
