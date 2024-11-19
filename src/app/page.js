"use client";
import { Container } from "react-bootstrap";
import Posts from "./components/Posts";
import MainNav from "./components/MainNav";
import Header from "./components/Header";

export default function Home() {
    return (
        <Container>
            <Header />
            <section>
                <img src="https://picsum.photos/id/1/1920/400" alt="" />
            </section>
            <Posts />
        </Container>
    );
}
