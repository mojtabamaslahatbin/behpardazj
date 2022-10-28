import { FormEvent, useState } from "react";
import axios from "axios";
import { Form, Button, Col, InputGroup, Spinner, Container } from "react-bootstrap";
import { FlashMessageType } from "../../models/types";

type Props = {
    CustomFlashMessage: (message: string, type: FlashMessageType) => void;
    fetchCount: number;
    setFetchCount: (val: number) => void;
};

const AddUser = ({ CustomFlashMessage, fetchCount, setFetchCount }: Props) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addUserHandler = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const userInput = { firstName, lastName, city, address };

        axios({
            url: "https://63581241c27556d289368088.mockapi.io/api/v1/users",
            method: "POST",
            data: userInput,
        })
            .then(response => {
                CustomFlashMessage("User Added Successfully", "success");
                setFetchCount(fetchCount + 1);
            })
            .catch(error => {
                CustomFlashMessage(error.message, "danger");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <Col xs lg="6">
                <Form className="mt-5" onSubmit={addUserHandler}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="firstName">FirstName</InputGroup.Text>
                        <Form.Control
                            aria-describedby="firstName"
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="lastName">LastName</InputGroup.Text>
                        <Form.Control
                            aria-describedby="lastName"
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="city">City</InputGroup.Text>
                        <Form.Control
                            aria-describedby="city"
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="address">Address</InputGroup.Text>
                        <Form.Control
                            aria-describedby="address"
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner
                                    animation="border"
                                    variant="light"
                                    role="status"
                                    size="sm"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </>
                        ) : (
                            "Add User"
                        )}
                    </Button>
                </Form>
            </Col>
        </Container>
    );
};

export default AddUser;
