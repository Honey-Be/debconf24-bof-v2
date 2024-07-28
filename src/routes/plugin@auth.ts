import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './../utils/salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB__CLIENT_SECRET
    }),
    DebianSalsa({
      clientId: process.env.DEBIAN_SALSA_CLIENT_ID,
      clientSecret: process.env.DEBIAN_SALSA_CLIENT_SECRET,
    })],
  }),
);
