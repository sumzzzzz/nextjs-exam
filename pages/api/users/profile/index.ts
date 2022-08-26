import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/db";

import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.token.findFirst({
    where: { userId: req.session.user?.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          posts: true
        },
      },
    },
  });

  if (!profile) {
    return res.json({ ok: false });
  }

  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);
