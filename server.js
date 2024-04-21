import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let posts = [{ content: 'sdfsdf', id: 0, created: Date.now(), name: 'Nikolay', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Shiba_in_Tallinn.JPG/1280px-Shiba_in_Tallinn.JPG'}];
let nextId = 1;

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  res.send(JSON.stringify(posts[index]));
});

app.post("/posts", (req, res) => {
  posts.push({ ...req.body, id: nextId++, created: Date.now(), name: 'Nikolay', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Shiba_in_Tallinn.JPG/1280px-Shiba_in_Tallinn.JPG'});
  res.send(JSON.stringify(posts));
  res.status(204).end();
});

app.put("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.map((o) => {
    if (o.id === postId) {
      return {
        ...o,
        ...req.body,
        id: o.id,
      };
    }
    return o;
  });
  res.send(JSON.stringify(posts));
  res.status(204).end();
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.send(JSON.stringify(posts));
  res.status(204).end();
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);