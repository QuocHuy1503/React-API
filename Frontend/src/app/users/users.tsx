"use client";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Modal, Row, Space, Table, Tag} from "antd";
import type {TableProps} from "antd";
import {Typography} from "antd";
import {IModalConfig, IUser} from "./interface";
import CustomerModal from "@/components/StudentModal";
import {deleteUser, getUsers} from "./api";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {notification} from "antd/lib";

const {Title} = Typography;

const ModalType = {
    CREATE: "create",
    UPDATE: "update"
};

export default function Crud() {
    const [modalConfig, setModalConfig] = useState<IModalConfig>({
        type: "",
        data: null,
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<[]>([]);
    const openModal = (type: string, data?: IUser) => {
        setModalConfig({
            type: type,
            data: data || null,
        });
    };

    const closeModal = () => {
        setModalConfig({
            type: "",
            data: null,
        });
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleFilled/>,
            content: 'Bạn có chắc muốn xóa nhân viên này không?',
            cancelText: "Đóng",
            okText: "Xác nhận",
            okType: "danger",
            maskClosable: true,
            onOk() {
                try {
                    deleteUser(id).then(() => {
                        handleReload();
                        notification.success({
                            message: 'Xóa thành công!',
                        })
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleReload = () => {
        handleRequest();
    }
    const handleGetUser = async () => {
        setLoading(true);
        try {
          const users = await getUsers();
          setData(users);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    };
    const handleRequest = useCallback(() => {
        handleGetUser();
    }, [handleGetUser]);

    useEffect(() => {
        handleRequest();
    }, [handleRequest]);

    const columns: TableProps<IUser>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Tên",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        openModal(ModalType.UPDATE, record);
                    }}>Sửa</Button>
                    <Button type="primary" danger onClick={() => {
                        handleDelete(record.id);
                    }}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row justify="space-between" align="bottom">
                <Col>
                    <Title level={4}>Danh sách sinh viên tiềm năng</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={() => {
                            openModal(ModalType.CREATE);
                        }}
                        style={{marginBottom: 8}}
                    >
                        Thêm người dùng
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} rowKey={record => record?.id} loading={loading}
                   pagination={{pageSize: 5}}/>
            {modalConfig.type && (
                <CustomerModal
                    open
                    onClose={closeModal}
                    formType={modalConfig.type === "create" ? "create" : "update"}
                    data={modalConfig.data}
                    handleReload={handleReload}
                />
            )}
            
        </>
    );
}
