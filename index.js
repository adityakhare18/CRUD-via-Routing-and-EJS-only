const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {}
  );
  res.redirect("/");
});

app.get("/file/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf8", (err, data) => {
    res.render('show',{fileData:data,fileName:req.params.fileName})
  });
});

app.get('/edit/:fileName',(req,res)=>{
    res.render('edit', {prevName:req.params.fileName})
})

app.post('/edit',(req,res)=>{
    console.log(req.body);
    fs.rename(`./files/${req.body.oldTitle}`,`./files/${req.body.newTitle}`,function(err){
        res.redirect('/');
    })
})

app.get('/delete/:fileName',(req,res)=>{
    fs.rm(`./files/${req.params.fileName}`,function(err){
        res.redirect("/");
    })
})

app.listen(3000, () => {
  console.log("server is running on port");
});
