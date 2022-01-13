import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';
import { Ticket } from '../models/ticket';
const { Title, Text } = Typography;

export const NewTicket = () => {

    useHideMenu(true);

    const { socket } = useContext<any>(SocketContext);
    const [ticket, seTticket] = useState<Ticket | null>(null);

    const newTicket = () => {
        socket.emit('solicitar-ticket', null, (ticket: Ticket) => {
            seTticket(ticket);
        });
    }

    return (
        <>
            <Row>
                <Col span={14} offset={4} style={{ textAlign: 'center' }}>
                    <Title level={3}>
                        press the button for a new ticket
                    </Title>
                    <Button
                        shape="round"
                        type="primary"
                        onClick={newTicket}
                    >
                        <DownloadOutlined />
                        Save Ticket
                    </Button>
                </Col>
            </Row>
            {
                ticket && (
                    <Row style={{ marginTop: 100 }}>
                        <Col span={14} offset={4} style={{ textAlign: 'center' }}>
                            <Text >
                                your number
                            </Text>
                            <br />
                            <Text type="success" style={{ fontSize: 55 }} >
                                {ticket?.number}
                            </Text>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}
