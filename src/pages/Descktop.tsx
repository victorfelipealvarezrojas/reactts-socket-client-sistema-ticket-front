import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Button, Divider } from 'antd'
import { CaretRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUsuarioStorage';
import { SocketContext } from '../context/SocketContext';
import { Ticket } from '../models/ticket';
import { NewTicket } from './NewTicket';
const { Title, Text } = Typography;

export const Descktop = () => {
    const navigate = useNavigate();
    const [usuario] = useState(getUserStorage());
    const { socket } = useContext<any>(SocketContext);
    const [NextTicket, setNextTicket] = useState<Ticket | null>(null);

    useHideMenu(false);

    const exitFunction = () => {
        localStorage.removeItem('agent');
        localStorage.removeItem('desck');
        navigate('/enter');
    }

    const nextTicket = () => {
        socket.emit('next-ticket', usuario, (ticket: Ticket) => {
            setNextTicket(ticket);
        });
    }

    if (!usuario.agent && !usuario.desck) return <Navigate to="/enter" />

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agent}</Title>
                    <Text>your are working at the descktop number </Text>
                    <Text type="success">{usuario.desck}</Text>
                </Col>
                <Col span={4} style={{ alignContent: 'right' }}   >
                    <Button
                        shape="round"
                        type="primary"
                        danger
                        onClick={exitFunction}
                    >
                        <CloseCircleOutlined />
                        Exit
                    </Button>
                </Col>
            </Row>
            <Divider />
            {
                NextTicket && (
                    <Row>
                        <Col>
                            <Text>Is attending the ticket number: </Text>
                            <Text style={{ fontSize: 30 }} type="danger">{NextTicket?.number}</Text>
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col offset={18} span={6} style={{ flexDirection: 'unset', justifyContent: 'right' }} >
                    <Button
                        onClick={nextTicket}
                        shape="round"
                        type="primary"
                    >
                        <CaretRightOutlined />
                        Next Ticket
                    </Button>
                </Col>
            </Row>
        </>
    )
}
