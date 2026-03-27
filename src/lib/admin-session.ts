import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSessionData {
  isAdmin: boolean;
  username: string;
  loginAt: number;
}

export const sessionOptions: SessionOptions = {
  cookieName: "bien_etre_admin_session",
  password: process.env.IRON_SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

export async function getAdminSession(): Promise<
  IronSession<AdminSessionData>
> {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, sessionOptions);
}
