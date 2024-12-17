import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
// import fs from "fs";
import { S3 } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

const s3 = new S3({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Something went wrong!");
  return db.prepare("select * from meals").all();
}

export function getMeal(slug) {
  return db.prepare("select * from meals where slug = @slug").get({ slug });
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "miftah-nextjs-demo-users-image",
    Key: `images/${fileName}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  // stream.write(Buffer.from(bufferedImage), (err) => {
  //   if (err) {
  //     throw new Error("Saving image failed!");
  //   }
  // });

  meal.image = `images/${fileName}`;

  db.prepare(
    "insert into meals (slug, title, image, summary, instructions, creator, creator_email) values (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)"
  ).run(meal);
}
