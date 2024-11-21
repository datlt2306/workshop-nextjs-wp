import { useQuery } from "@tanstack/react-query";
import React from "react";

const DemoReactQuery = () => {
    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/products`);
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();
            return data;
        },
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error}</div>;
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

export default DemoReactQuery;
