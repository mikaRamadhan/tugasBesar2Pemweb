const express = require("express");
const supabase = require("@supabase/supabase-js");
const app = express();
app.use(express.json());
const PORT = 3211;
const SUPABASE_URL = "https://fpblamxlwzwfrshduiwh.supabase.co";
const SUPABASE_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwYmxhbXhsd3p3ZnJzaGR1aXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyODA5MTIsImV4cCI6MjA0OTg1NjkxMn0.PVlhfhbbJM-Ss69SjVzrjhDTZkHgQMV5CwzwZoQngoI";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

app.get("/", async (req, res) => {
  const getBlog = await db.from("blog2").select();
  // console.log(getBlog)
  // res.send('ini adalah route utama')
  res.json({ getBlog });
});

app.post("/", async (req, res) => {
  const { title, authors, description, postBlog } = req.body;
  // console.log(title, description)
  const createPost = await db
    .from("blog2")
    .insert({ title, authors, description, postBlog });
  console.log(createPost);
  res.json({ createPost });
});

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});

// Route Update
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatePost = await db
    .from("blog2")
    .update({ title, description })
    .eq("id", id);

  if (updatePost.error) {
    res.status(400).json({ error: updatePost.error });
  } else {
    res.json({ message: "Post updated successfully", updatePost });
  }
});

// Route Delete
app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletePost = await db.from("blog2").delete().eq("id", id);

  if (deletePost.error) {
    res.status(400).json({ error: deletePost.error });
  } else {
    res.json({ message: "Post deleted successfully", deletePost });
  }
});

// CATATAN
// console.log('API endpoint utama diakses') //untuk trouble shoot menggunakan console.log
