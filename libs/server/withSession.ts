import { withIronSessionApiRoute } from "iron-session/next";


declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: "4W1z%%WmVr%kL!0N^c4&1X#Bn4J#PM$oH2@3TP*g"
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}