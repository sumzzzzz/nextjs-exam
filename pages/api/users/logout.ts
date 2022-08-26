import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/db";

import { withApiSession } from "../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (!req.session.user) return res.status(404).end();

  await client.token.deleteMany({
    where: { userId: req.session.user.id },
  });

  req.session.user = { id: -1 };
  await req.session.save();

  res.json({
    ok: true,
    
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
