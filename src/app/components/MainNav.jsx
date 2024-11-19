"use client";

import { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
const MainNav = () => {
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(
                    `https://workshop.webopsagency.com/wp-json/custom/v1/menus`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch menus");
                }
                const data = await response.json();
                setMenus(Object.values(data.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchMenus();
    }, []);

    const renderMenu = (items) => {
        return items.map((item) => {
            if (item.submenu && item.submenu.length > 0) {
                return (
                    <NavDropdown key={item.ID} title={item.title} id={`nav-dropdown-${item.ID}`}>
                        {item.submenu.map((subItem) => (
                            <NavDropdown.Item key={subItem.ID} href={`${subItem.url}`}>
                                {subItem.title}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                );
            } else {
                return (
                    <Nav.Link key={item.ID} href={`${item.url}`}>
                        {item.title}
                    </Nav.Link>
                );
            }
        });
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">{renderMenu(menus)}</Nav>
            </Navbar.Collapse>
            <Form inline>
                <Row>
                    <Col xs="auto">
                        <Form.Control type="text" placeholder="Search" className=" mr-sm-2" />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Navbar>
    );
};

export default MainNav;
