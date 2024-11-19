import React from "react";
import { Container } from "react-bootstrap";

const PostDetailPage = async ({ params }) => {
    const { slug } = await params;
    console.log(slug);
    const response = await fetch(
        `https://workshop.webopsagency.com/wp-json/custom/v1/detail?slug=${slug}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch post detail");
    }
    const data = await response.json();
    return (
        <Container>
            <h1>{data.data.post_title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.data.post_content }}></div>
        </Container>
    );
};

export default PostDetailPage;
