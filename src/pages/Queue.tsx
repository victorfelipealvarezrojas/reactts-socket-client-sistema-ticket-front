import { Col, Row, Typography, List, Card, Tag, Divider } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getUltimos } from "../helpers/getUltimos";
import { useHideMenu } from "../hooks/useHideMenu";
import { Ticket } from "../models/ticket";
//import { QueueData } from "../queue-data-tem";

const { Title, Text } = Typography;
const { Item } = List;

export const Queue = () => {
    useHideMenu(true);
    const { socket } = useContext<any>(SocketContext);
    const [ticket, setTicket] = useState<Ticket[]>([]);

    useEffect(() => {
        socket.on('ticket-asignado', (ticket: Ticket[]) => setTicket(ticket));

        return () => socket.off('ticket-asignado');

    }, [socket]);

    useEffect(()=>{
        getUltimos().then((ticket:Ticket[]) => {
            setTicket(ticket);
        });
    },[])

    return (
        <>
            <Title level={1}>Serving the customer</Title>
            <Row>
                <Col span={12}>
                    <List
                        dataSource={ticket}
                        renderItem={item => (
                            <Item>
                                <Card
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <Tag color="volcano">{item.agent}</Tag>,
                                        <Tag color="magenta">Escritorio: {item.desck}</Tag>,
                                    ]}
                                >
                                    <Title>Nro. {item.number}</Title>
                                </Card>
                            </Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <Divider>Historial</Divider>
                    <List
                        dataSource={ticket}
                        renderItem={item => (
                            <Item>
                                <Item.Meta
                                    title={`Ticket Nro. ${item.number}`}
                                    description={
                                        <>
                                            <Text type="secondary">In descktop: </Text>
                                            <Tag color="magenta">{item.number}</Tag>
                                            <Text type="secondary">Agent: </Text>
                                            <Tag color="magenta">{item.agent}</Tag>
                                        </>
                                    }
                                />
                            </Item>
                        )}
                    ></List>
                </Col>
            </Row>
        </>
    )
}

