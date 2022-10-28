import { ToastContainer, Col, Row, Toast } from "react-bootstrap";
import { FlashMessageType } from "../../models/types";

type Props = {
    message: string;
    showFlashMessage: boolean;
    setShowFlashMessage: (open: boolean) => void;
    messageType: FlashMessageType;
};

const FlashMessage = ({ message, showFlashMessage, setShowFlashMessage, messageType }: Props) => {
    return (
        <Row>
            <Col xs={6}>
                <ToastContainer className="p-3 mt-3" position="top-end">
                    <Toast
                        onClose={() => setShowFlashMessage(false)}
                        show={showFlashMessage}
                        delay={3000}
                        autohide
                        bg={messageType}
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                {messageType === "success" ? "Success" : "Failure"}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className="text-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    );
};

export default FlashMessage;
