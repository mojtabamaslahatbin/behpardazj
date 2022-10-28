import { ApiResponse } from "../../models/types";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styles from "./usersTable.module.css";
import { Alert } from "react-bootstrap";

type Props = {
    data: ApiResponse[];
    loading: boolean;
};

const UsersTable = ({ data, loading }: Props) => {
    const navigate = useNavigate();

    const handleSelectUser = (id: string) => {
        navigate(`/${id}`);
    };
    return (
        <>
            {loading ? (
                <Alert variant="success">Loading Table ...</Alert>
            ) : (
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
                        {data.map(user => {
                            return (
                                <tr
                                    key={user.id}
                                    onClick={() => handleSelectUser(user.id)}
                                    className={styles.userRow}
                                >
                                    <td>{user.id}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.city}</td>
                                    <td>{user.address}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UsersTable;
