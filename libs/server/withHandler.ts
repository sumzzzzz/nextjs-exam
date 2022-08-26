import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method =  "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = false,
}: ConfigType) {
  // nextJS가 실행해야 할 것을 return 해야 한다.
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // (이 withHandler를 export defualt하는) function을 bad request로부터 보호함
    if (req.method &&  !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "please log in" });
    }

    try {
      await handler(req, res);
    } catch (error) {
      // server error 발생
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
