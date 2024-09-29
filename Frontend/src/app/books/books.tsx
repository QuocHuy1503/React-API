import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Modal, Row, Space, Table, Tag} from "antd";
import type {TableProps} from "antd";
import {Typography} from "antd";
import {IModalConfig, IBook} from "./interface";
import BookModal from "@/components/BookModal";
import {deleteBook, getBooks} from "@/app/books/api";
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

    const openModal = (type: string, data?: IBook) => {
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
            content: 'Bạn có chắc muốn xóa sách này?',
            cancelText: "Đóng",
            okText: "Xác nhận",
            okType: "danger",
            maskClosable: true,
            onOk() {
                try {
                    deleteBook(id).then(() => {
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
        getBooks()
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

    const columns: TableProps<IBook>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Thông tin",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Tác giả",
            key: "author",
            dataIndex: "author",
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
                    <Title level={4}>Danh sách sách tiềm năng</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={() => {
                            openModal(ModalType.CREATE);
                        }}
                        style={{marginBottom: 8}}
                    >
                        Thêm sách
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} rowKey={record => record?.id} loading={loading}
                   pagination={{pageSize: 5}}/>
            {modalConfig.type && (
                <BookModal
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
