import React, { useEffect, useState } from "react";

const DemoUseEffect = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/productsssss`);
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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{isError}</div>;
    return (
        <div>
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
