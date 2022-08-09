import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string | string[];
  ok: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { msg = "Bad request" } = req.query;
  res.status(400).json({ msg, ok: false });
}
