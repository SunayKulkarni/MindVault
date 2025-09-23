import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import bcrypt from "bcrypt";
import { JWT_SECRET,MONGODB_URI } from "./config";
import { userMiddleware, AuthenticatedRequest } from "./auth";
import { LinkModel } from "./db";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

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

app.post("/api/v1/content",userMiddleware, async (req: AuthenticatedRequest, res) => {
    const link = req.body.link;
    const type = req.body.type;
    //const tag...
    const title = req.body.title;

    await ContentModel.create({
      link,
      type,
      title,
      contentId: req.userId,
    });

    res.json({
      message: "Content Added",
    });
  },
);

app.get("/api/v1/content", userMiddleware,async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    const content = await ContentModel.find({
      contentId: userId,
    }).populate("contentId");

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
      contentId: req.userId,
    });

    res.json({
      message: "Content Deleted Succesfully",
    });
  },
);

app.post("/api/v1/brain/share", userMiddleware, async (req:AuthenticatedRequest, res) => {
  const share  = req.body.share;
  if(share){
    await LinkModel.create({
       userId : req.userId,
       hash : Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15),
    })
  }
  else{
    await LinkModel.deleteOne({
      userId : req.userId,
    })
  }
})


app.get("/api/v1/brain/:sharableLink", async (req, res) => {
  const hash = req.params.sharableLink;

  const link = await LinkModel.findOne({
     hash 
  })

   if(!link){
      res.status(411).json({
        message : "Link not Valid"
      })
      return;
   }
   else{
      const content = await ContentModel.find({
        userId : link.userId
      })

      const user = await UserModel.findOne({
         userId : link.userId
      })
 
      // ideally this should not happen
      if(!user){
        res.json({
          message : "User not found"
        })
      }

      res.json({
        username : user?.username,
        content : content
      })
     
   } 

})

function main() {
  mongoose.connect(
    MONGODB_URI!
  );
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();
