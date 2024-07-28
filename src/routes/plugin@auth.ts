import { QwikAuth$ } from "@auth/qwik";
import DebianSalsa from "./salsa";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  ({env}) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [DebianSalsa({
      clientId: env.get("DEBIAN_SALSA_CLIENT_ID"),
      clientSecret: env.get("DEBIAN_SALSA_CLIENT_SECRET"),
    })],
    useSecureCookies: true
  }),
);
