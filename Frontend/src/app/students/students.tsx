import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Modal, Row, Space, Table, Tag} from "antd";
import type {TableProps} from "antd";
import {Typography} from "antd";
import {IModalConfig, IDataType} from "./interface";
import CustomerModal from "@/components/StudentModal";
import {deleteStudent, getStudents} from "@/app/students/api";
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

    const openModal = (type: string, data?: IDataType) => {
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

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleFilled/>,
            content: 'Bạn có chắc muốn xóa sinh viên này?',
            cancelText: "Đóng",
            okText: "Xác nhận",
            okType: "danger",
            maskClosable: true,
            onOk() {
                try {
                    deleteStudent(id).then(() => {
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

    const handleRequest = useCallback(() => {
        setLoading(true);
        getStudents()
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setLoading, setData]);

    useEffect(() => {
        handleRequest();
    }, [handleRequest]);

    const columns: TableProps<IDataType>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
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
                        Thêm sinh viên
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
