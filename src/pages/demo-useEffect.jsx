import React, { useEffect, useState } from "react";

const DemoUseEffect = () => {
    // client state:
    // - useContext + useReducer => techstack
    // - redux toolkit + redux toolkit query
    // - recoil + react-query
    // - zustand + react-query

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const [isPending, setIsPending] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/products`);
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setIsError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const onHandleAdd = async () => {
        setIsPending(true);
        try {
            const response = await fetch(`http://localhost:3000/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 16,
                    name: "Product 16",
                    price: 22.99,
                    imageUrl: "http://example.com/product16.jpg",
                    inStock: true,
                }),
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            setIsPending(false);
            setProducts([
                ...products,
                {
                    id: 16,
                    name: "Product 16",
                    price: 22.99,
                    imageUrl: "http://example.com/product16.jpg",
                    inStock: true,
                },
            ]);
        } catch (error) {
            alert("Thêm thất bại");
            setIsPending(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{isError}</div>;
    return (
        <div>
            <button onClick={onHandleAdd}>{isPending ? "Đang thêm" : "Thêm sản phẩm"}</button>
            <ul>
                {products.map((item) => {
                    return (
                        <li key={item.id}>
                            <img src={item.imageUrl} />
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div>{item.inStock ? "Còn hàng" : "Hết hàng"}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DemoUseEffect;
