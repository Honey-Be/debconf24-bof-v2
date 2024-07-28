import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './../utils/salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Github({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB__CLIENT_SECRET
    }),
    DebianSalsa({
      clientId: import.meta.env.DEBIAN_SALSA_CLIENT_ID,
      clientSecret: import.meta.env.DEBIAN_SALSA_CLIENT_SECRET,
    })],
  }),
);
