import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from './../utils/salsa';

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [DebianSalsa({
			clientId: import.meta.env.NEXT_DEBIAN_SALSA_CLIENT_ID,
			clientSecret: import.meta.env.NEXT_DEBIAN_SALSA_CLIENT_SECRET
    })],
  }),
);
