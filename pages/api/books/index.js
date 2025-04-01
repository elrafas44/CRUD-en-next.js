import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const books = await prisma.book.findMany();
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching books" });
        }
    }

    if (req.method === "POST") {
        try {
            const { title, author } = req.body;
            const newBook = await prisma.book.create({ data: { title, author } });
            return res.status(201).json(newBook);
        } catch (error) {
            return res.status(500).json({ error: "Error creating book" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
