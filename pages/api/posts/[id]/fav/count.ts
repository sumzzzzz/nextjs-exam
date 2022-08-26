import { NextApiRequest, NextApiResponse } from "next";
import withHandler, {
  ResponseType,
} from "../../../../../libs/server/withHandler";
import client from "../../../../../libs/server/db";
import { withApiSession } from "../../../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.fav.findFirst({
    where: {
      postId: Number(id?.toString()),
      userId: user?.id,
    },
  });
  const isFav = alreadyExists !== null && alreadyExists ? true : false;

  const post = await client.post.findUnique({
    where: {
      id: Number(id?.toString()),
    },
    include: {
      _count: {
        select: {
          favList: true,
        },
      },
    },
  });

  const countFav = post ? post._count.favList : 0;

  res.json({ ok: true, countFav: countFav, isFav: isFav });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
