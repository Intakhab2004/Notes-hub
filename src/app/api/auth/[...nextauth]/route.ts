import NextAuth from "next-auth";
import { auhtOptions } from "./options";

const handler = NextAuth(auhtOptions);

export { handler as GET, handler as POST};