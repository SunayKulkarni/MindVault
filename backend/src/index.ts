import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import bcrypt from "bcrypt";
import { JWT_SECRET, MONGODB_URI } from "./config";
import { userMiddleware, AuthenticatedRequest } from "./auth";
import { LinkModel } from "./db";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

if (!JWT_SECRET) {
  throw new Error("JWTSECRET environment variable is required");
}

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    res.json({
      message: "SignUp successfull",
    });
  } catch (e) {
    res.status(409).json({
      message: "Error Occured in db",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await UserModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const passMatch = await bcrypt.compare(password, user.password!);
  if (!passMatch) {
    return res.status(403).json({ message: "Invalid  Credentials" });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_SECRET!,
  );
  res.json({
    message: token,
  });
});

app.post(
  "/api/v1/content",
  userMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const link = req.body.link;
    const type = req.body.type;
    //const tag...
    const title = req.body.title;

    await ContentModel.create({
      link,
      type,
      title,
      userId: req.userId,
    });

    res.json({
      message: "Content Added",
    });
  },
);

app.get(
  "/api/v1/content",
  userMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId");

    res.json({
      content,
    });
  },
);

app.delete(
  "/api/v1/content",
  userMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const contentIdtoDelete = req.body.contentId;
    await ContentModel.deleteMany({
      _id: contentIdtoDelete,
      userId: req.userId,
    });

    res.json({
      message: "Content Deleted Succesfully",
    });
  },
);

app.post(
  "/api/v1/brain/share",
  userMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const share = req.body.share;
    const hash =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    if (share) {
      await LinkModel.create({
        userId: req.userId,
        hash: hash,
      });

      console.log(hash);
      res.json({
        message: hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        message: "Link Deleted",
      });
    }
  },
);

app.get("/api/v1/brain/:sharableLink", async (req, res) => {
  const hash = req.params.sharableLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Link not Valid",
    });
    return;
  } else {
    try {
      const content = await ContentModel.find({
        userId: link.userId,
      });

      const user = await UserModel.findOne({
        _id: link.userId,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!content || content.length === 0) {
        return res.status(404).json({
          message: "Content not found",
        });
      }

      res.json({
        username: user.username,
        content: content,
      });
    } catch (error) {
      console.error("Error fetching shared content:", error);
      res.status(500).json({
        message: "Error retrieving shared content",
      });
    }
  }
});

function main() {
  mongoose.connect(MONGODB_URI!);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();
