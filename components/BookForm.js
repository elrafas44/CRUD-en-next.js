import { useState } from "react";

export default function BookForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [author, setAuthor] = useState(initialData?.author || "");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ title, author });
                setTitle("");
                setAuthor("");
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "300px",
                marginBottom: "16px"
            }}
        >
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
                style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                }}
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Autor"
                required
                style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                }}
            />
            <button type="submit" style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
            }}>
                {initialData ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
}
