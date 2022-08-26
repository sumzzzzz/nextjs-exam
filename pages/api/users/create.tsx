import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  let ok = true;
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ ok: false });

  // check user
  const checkUser = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (checkUser == null || checkUser.email !== email) {
    // create user
    await client.user.create({
      data: {
        email: email,
        name: Boolean(name) ? name :"Anonymous",
      },
    });

    return res.status(200).json({
      ok: ok,
    });
  }
  return res.status(202).json({
    ok: false,
    error: "existing email"
  })
}

// nextjs에서 api route를 만들 때는 그 function을 return해야 한다.
export default withHandler({
  methods: ["POST"],
  handler,
});
