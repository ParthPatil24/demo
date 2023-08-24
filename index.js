import express from "express"
import mysql2 from "mysql2"

const app = express()

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Parth@123",
    database: "nodeapp"
})

app.use(express.json())

app.get("/", (req, res) => {
    res.json("hello it's the backend")
})

app.get("/contacts", (req, res) => {
    const q = "select * from contacts";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/search-contact/:id", (req, res) => {
    const id = req.params.id
    const q = "select * from contacts WHERE id=?";
    db.query(q, id, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/create-contact", (req, res) => {
    const q = "INSERT INTO contacts (id, name, phone, image) VALUES (?, ?, CAST(? AS JSON), ?)";
    const values = [
        req.body.id,
        req.body.name,
        JSON.stringify(req.body.phone),
        req.body.image
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        return res.json("Successfully created the contact")
    })
})

app.put("/update-contact/:id/:num", (req, res) => {
    const id = req.params.id;
    const num = JSON.stringify(req.params.num);
    const q = "UPDATE contacts SET phone=CAST(? AS JSON) WHERE id=?"
    db.query(q, [num, id], (err, data) => {
        if (err) return res.json(err)
        return res.json("Successfully updated the contact")
    })
});

app.delete("/delete-contact/:id", (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM contacts where id=?"
    db.query(q, id, (err, data) => {
        if (err) return res.json(err)
        return res.json("Successfully deleted the contact")
    })
})

app.listen(5100, () => {
    console.log("Connected to backend!")
})