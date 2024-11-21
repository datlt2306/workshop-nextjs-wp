import { useMutation, useQuery } from "@tanstack/react-query";
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

    const { mutate, isPending } = useMutation({
        mutationFn: async (product) => {
            const response = await fetch(`http://localhost:3000/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
        },
        onSuccess: () => {},
        onError: (error) => {},
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error}</div>;
    return (
        <div>
            <button
                onClick={() =>
                    mutate({
                        id: 16,
                        name: "Product 16",
                        price: 22.99,
                        imageUrl: "http://example.com/product16.jpg",
                        inStock: true,
                    })
                }
            >
                {isPending ? "Đang thêm" : "Thêm sản phẩm"}
            </button>

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
