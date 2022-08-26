import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/db";
// import smtpTransport from "@libs/server/email";
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// 비용으로 되는지 확인만 하고 console에 payload 출력으로 대체함

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  // check user
  const checkUser = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!checkUser) {
    return res.status(400).json({ ok: false });
  }

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connect:{
          id: checkUser.id
        },
      },
    },
  });

  console.log(`### Authentication Code : ${payload} ###`, token);

  return res.status(200).json({
    ok: true,
  });
}

// nextjs에서 api route를 만들 때는 그 function을 return해야 한다.
export default withHandler({
  methods: ["POST"],
  handler,
});
