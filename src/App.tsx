import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { ApiResponse, FlashMessageType } from "./models/types";
import UsersTable from "./components/UsersTable";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";
import { Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import FlashMessage from "./components/FlashMessage";
import ErrorBoundary from "./hoc/ErrorBoundary";
import axios from "axios";

const App: React.FC = () => {
    const [allUsersData, setAllUsersData] = useState<ApiResponse[]>([]);
    const [messageText, setMessageText] = useState<string>("Flash Message");
    const [messageType, setMessageType] = useState<FlashMessageType>("success");
    const [showFlashMessage, setShowFlashMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetchCount, setFetchCount] = useState<number>(0);

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            await axios
                .get(`https://63581241c27556d289368088.mockapi.io/api/v1/users`)
                .then(response => {
                    setAllUsersData(response.data);
                })
                .catch(error => {
                    CustomFlashMessage(error.message, "danger");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };
        getUsers();
    }, [fetchCount]);

    const CustomFlashMessage = useCallback((text: string, type: FlashMessageType) => {
        setMessageText(text);
        setMessageType(type);
        setShowFlashMessage(true);
    }, []);

    return (
        <>
            <ErrorBoundary>
                <BrowserRouter>
                    <div>
                        <MyNavbar />
                        <Container className="mt-4">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<UsersTable data={allUsersData} loading={isLoading} />}
                                />
                                <Route
                                    path="/add-user"
                                    element={
                                        <AddUser
                                            CustomFlashMessage={CustomFlashMessage}
                                            fetchCount={fetchCount}
                                            setFetchCount={setFetchCount}
                                        />
                                    }
                                />
                                <Route
                                    path="/:id"
                                    element={
                                        <UserDetails
                                            CustomFlashMessage={CustomFlashMessage}
                                            fetchCount={fetchCount}
                                            setFetchCount={setFetchCount}
                                        />
                                    }
                                />
                            </Routes>
                        </Container>
                    </div>
                </BrowserRouter>
                <FlashMessage
                    message={messageText}
                    showFlashMessage={showFlashMessage}
                    setShowFlashMessage={setShowFlashMessage}
                    messageType={messageType}
                />
            </ErrorBoundary>
        </>
    );
};

export default App;
