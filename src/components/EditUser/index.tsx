import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { ApiResponse, FlashMessageType } from "../../models/types";

type Props = {
    userData: ApiResponse;
    CustomFlashMessage: (message: string, type: FlashMessageType) => void;
    fetchCount: number;
    setFetchCount: (val: number) => void;
};

const EditUser = ({ userData, CustomFlashMessage, fetchCount, setFetchCount }: Props) => {
    const [firstName, setFirstName] = useState<string>(userData.firstName);
    const [lastName, setLastName] = useState<string>(userData.lastName);
    const [city, setCity] = useState<string>(userData.city);
    const [address, setAddress] = useState<string>(userData.address);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formData = {
        firstName,
        lastName,
        city,
        address,
    };

    const updateUserHandler = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        axios({
            url: `https://63581241c27556d289368088.mockapi.io/api/v1/users/${userData.id}`,
            method: "PUT",
            data: formData,
        })
            .then(() => {
                CustomFlashMessage("User Edited Successfully", "success");
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
        <>
            <Col xs lg="6">
                <Form className="mt-5" onSubmit={updateUserHandler}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="firstName">FirstName</InputGroup.Text>
                        <Form.Control
                            aria-describedby="firstName"
                            defaultValue={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="lastName">LastName</InputGroup.Text>
                        <Form.Control
                            aria-describedby="lastName"
                            defaultValue={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="city">City</InputGroup.Text>
                        <Form.Control
                            aria-describedby="city"
                            defaultValue={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="address">Address</InputGroup.Text>
                        <Form.Control
                            aria-describedby="address"
                            defaultValue={address}
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
                            "Apply Changes"
                        )}
                    </Button>
                </Form>
            </Col>
        </>
    );
};

export default EditUser;
