import cors from "cors";
import express, { Request, Response } from "express";
import mime from "mime";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

// File upload endpoint
app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
    } else {
      console.log(req.file.filename);
      req.file.filename = req.file.filename.replace(/\s/g, "_");
      res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
    }
  }
);

// Endpoint to retrieve file path
//@ts-expect-error - TS complains about the Response type
app.get("/download/:filename", async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  const mimeType = mime.getType(filePath);

  if (!mimeType) {
    return res.status(404).json({ message: "File not found" });
  }

  console.time(`Downloading file: ${filename}`);
  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: "Error downloading file" });
    }
  });
});

// send a file as a blob to be parsed on the frontend (next.js)
//@ts-expect-error - TS complains about the Response type
app.get("/blob/:filename", (req: express.Request, res: express.Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  const mimeType = mime.getType(filePath);

  if (!mimeType) {
    return res.status(404).json({ message: "File not found" });
  }

  res.setHeader("Content-Type", mimeType);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: "Error sending file" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`File server running on http://localhost:${PORT}`);
});
