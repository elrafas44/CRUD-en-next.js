import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { title, author } = req.body;
            const updatedBook = await prisma.book.update({
                where: { id: parseInt(id) },
                data: { title, author },
            });
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ error: "Error updating book" });
        }
    }

    if (req.method === "DELETE") {
        try {
            await prisma.book.delete({ where: { id: parseInt(id) } });
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: "Error deleting book" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
