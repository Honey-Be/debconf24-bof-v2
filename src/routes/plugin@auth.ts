import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './../utils/salsa';
import Github from "@auth/qwik/providers/github"

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Github],
  }),
);
