import { useEffect, useState } from "react";
import { ApiResponse, FlashMessageType } from "../../models/types";
import { useParams } from "react-router-dom";
import { Alert, Button, Container, Table } from "react-bootstrap";
import EditUser from "../EditUser";
import axios from "axios";

type Props = {
    CustomFlashMessage: (message: string, type: FlashMessageType) => void;
    fetchCount: number;
    setFetchCount: (val: number) => void;
};

const UserDetails = ({ CustomFlashMessage, fetchCount, setFetchCount }: Props) => {
    const [selectedUserData, setSelectedUserData] = useState<ApiResponse | null>(null);
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { id } = useParams() as { id: string };

    useEffect(() => {
        const getSelectedUser = async () => {
            await axios
                .get(`https://63581241c27556d289368088.mockapi.io/api/v1/users/${id}`)
                .then(response => {
                    setSelectedUserData(response.data);
                })
                .catch(error => {
                    CustomFlashMessage("Loading User Failed", "danger");
                });
        };
        getSelectedUser();
    }, [id, fetchCount]);

    return (
        <Container>
            {selectedUserData ? (
                <>
                    <Table className="mt-4" striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>createdAt</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>City</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedUserData.id}</td>
                                <td>{selectedUserData.createdAt}</td>
                                <td>{selectedUserData.firstName}</td>
                                <td>{selectedUserData.lastName}</td>
                                <td>{selectedUserData.city}</td>
                                <td>{selectedUserData.address}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => setShowEdit(showEdit => !showEdit)}>
                        {showEdit ? "Hide Edit" : "Edit User"}
                    </Button>

                    {showEdit && (
                        <EditUser
                            userData={selectedUserData}
                            CustomFlashMessage={CustomFlashMessage}
                            fetchCount={fetchCount}
                            setFetchCount={setFetchCount}
                        />
                    )}
                </>
            ) : (
                <Alert variant="success">Loading User Details ...</Alert>
            )}
        </Container>
    );
};

export default UserDetails;
