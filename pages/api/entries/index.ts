import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      msg: string;
    }
  | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return createEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    default:
      return res.status(200).json({ msg: "Endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ msg: "Error al obtener los datos" });
  }
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    await Entry.create(req.body);
    res.status(200).json({ msg: "Agregado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear el registro" });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    await Entry.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.status(200).json({ msg: "Actualizado con exito" });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar el registro" });
  }
};
