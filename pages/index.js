import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetch("/api/books")
            .then((res) => res.json())
            .then(setBooks);
    }, []);

    const handleAddOrUpdateBook = (book) => {
        const method = editingBook ? "PUT" : "POST";
        const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        }).then(() => {
            setEditingBook(null);
            location.reload();
        });
    };

    const handleDelete = (id) => {
        fetch(`/api/books/${id}`, { method: "DELETE" }).then(() => location.reload());
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif"}}>
            <h1 style={{ color: "#333" }}>Gestión de Libros</h1>
            <BookForm onSubmit={handleAddOrUpdateBook} initialData={editingBook} />
            <ul style={{ listStyle: "none", padding: 0}}>
                {books.map((book) => (
                    <li key={book.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#f9f9f9",
                        padding: "8px",
                        marginBottom: "8px",
                        borderRadius: "4px"
                    }}>
                        <span>{book.title} - {book.author}</span>
                        <div>
                            <button onClick={() => setEditingBook(book)} style={{
                                marginRight: "8px",
                                backgroundColor: "#ffc107",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}>Editar</button>
                            <button onClick={() => handleDelete(book.id)} style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
