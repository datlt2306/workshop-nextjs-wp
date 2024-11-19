"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `https://workshop.webopsagency.com/wp-json/custom/v1/blogs`
            );
            if (!response.ok) {
                return console.error("Failed to fetch posts");
            }
            const data = await response.json();
            setPosts(data.data);
        };
        fetchPosts();
    }, []);
    return (
        <section>
            <h2>Tin tức</h2>
            <Row>
                {posts.map((post) => (
                    <Col sm={3} key={post.ID} className="tw-mb-5">
                        <Card>
                            <Image
                                src={post.thumbnail}
                                alt={post.post_title}
                                width={400}
                                height={300}
                            />
                            <Card.Body>
                                <Card.Title>{post.post_title}</Card.Title>
                                <Card.Text>{post.post_excerpt}</Card.Text>
                                <Link href={`/posts/${post.post_name}`}>
                                    <Button variant="primary">Chi tiết</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default Posts;
