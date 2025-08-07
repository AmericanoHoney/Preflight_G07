import "dotenv/config";
import { dbClient } from "@db/client.js";
import { stockTable } from "@db/schema.js";
import cors from "cors";
import Debug from "debug";
import { eq } from "drizzle-orm";
import type { ErrorRequestHandler } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
const debug = Debug("pf-backend");

//Intializing the express app
const app = express();

//Middleware
app.use(morgan("dev", { immediate: false }));
app.use(helmet());
app.use(
  cors({
    origin: false, // Disable CORS
    // origin: "*", // Allow all origins
  })
);
// Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());

// Query
app.get("/stock", async (req, res, next) => {
  try {
    const results = await dbClient.query.stockTable.findMany();
    res.json(results);
  } catch (err) {
    next(err);
  }
});
//get owner
app.get("/stock/owner", (req, res) => {
  res.json({
    id: "660610757",
    name: "Natrada Nuchit",
    course_id: "269497",
    section: "001",
  });
});

// Insert
app.put("/stock", async (req, res, next) => {
  try {
    const { imageUrl, title, productid, category, amount } = req.body;
    if (!title || !category || typeof amount !== "number")
      throw new Error("Missing required fields");

    const id = uuidv4();

    await dbClient.insert(stockTable).values({
      id,
      imageUrl,
      title,
      productid,
      category,
      amount,
    });

    const result = await dbClient
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, id));

    res.json({ msg: "Stock item inserted", data: result[0] });
  } catch (err) {
    next(err);
  }
});

// Update
app.patch("/stock", async (req, res, next) => {
  try {
    const { id, imageUrl, title, category, amount } = req.body;
    if (!id) throw new Error("Missing id");

    await dbClient
      .update(stockTable)
      .set({ imageUrl, title, category, amount })
      .where(eq(stockTable.id, id));

    const result = await dbClient
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, id));

    res.json({ msg: "Update successfully", data: result[0] });
  } catch (err) {
    next(err);
  }
});

// Delete
app.delete("/stock", async (req, res, next) => {
  try {
    const id = req.body.id ?? "";
    if (!id) throw new Error("Empty id");


    await dbClient.delete(stockTable).where(eq(stockTable.id, id));

    res.json({
      msg: `Delete successfully`,
      data: { id },
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/stock/all", async (req, res, next) => {
  try {
    await dbClient.delete(stockTable);
    res.json({
      msg: `Delete all rows successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

// JSON Error Middleware
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  debug(err.message);
  const errorResponse = {
    message: err.message || "Internal Server Error",
    type: err.name || "Error",
    stack: err.stack,
  };
  res.status(500).send(errorResponse);
};
app.use(jsonErrorHandler);

// Running app
const PORT = process.env.PORT || 3000;
// * Running app
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
