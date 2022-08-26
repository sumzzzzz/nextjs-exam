import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/db";

import { withApiSession } from "../../../libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include: {
        _count: {
          select: {
            favList: true,
          }
        }
      }
    });

    res.json({
      ok: true,
      posts,
    })

  } else if (req.method === "POST") {
    const {
      body: { content },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      post,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: true,
  })
);
