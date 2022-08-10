import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      msg: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!mongoose.isValidObjectId(req?.query?.id)) {
    return res.status(400).json({ msg: "Invalid id" });
  }
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(200).json({ msg: "Endpoint no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entry = await Entry.findById(req.query.id);
    if (!entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ msg: "Error al obtener los datos" });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    await Entry.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { ...req.body } }
    );
    res.status(200).json({ msg: "Actualizado con éxito" });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar el registro" });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    await Entry.findOneAndDelete({ _id: req.query.id });
    res.status(200).json({ msg: "Eliminado con éxito" });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar el registro" });
  }
};
