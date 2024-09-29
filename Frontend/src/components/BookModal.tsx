import React, {useEffect, useState} from "react";
import {
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Typography,
} from "antd";
import type {FormProps} from "antd";

const {Text} = Typography;
const {Option} = Select;
import {IBook} from "@/app/books/interface";
import {createBook, updateBook} from "@/app/books/api";
import {notification} from "antd/lib";
import dayjs, {Dayjs} from "dayjs";

type Props = {
    open: boolean;
    onClose: () => void;
    formType: "create" | "update";
    data: IBook | null;
    handleReload: () => void;
};

type FieldType = {
    id?: string;
    title?: string;
    description?: string|null;
    price?: number;
    author?: string;
};

const validateMessages = {
    required: "Vui lòng nhập trường ${label}!",
    types: {
        email: "${label} không hợp lệ!",
        number: "${label} không hợp lệ!",
    }
};

const bookModal = ({open, onClose, formType, data, handleReload}: Props) => {
    const [form] = Form.useForm();

    const data2 = {
        ...data,
    }

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleSubmit = () => {
        try {
            form.validateFields().then((value) => {
                value.birthday = dayjs(value.birthday).format("YYYY-MM-DD");
                const payload = {
                    title: value.title,
                    description: value.description,
                    price: value.price,
                    author: value.author,
                }
                form.resetFields();
                if (formType === "create") {
                    createBook(payload).then(r => {
                        console.log(r)
                        handleReload();
                        onClose();
                        notification.success({
                            message: "Thêm sách thành công!"
                        });
                    });
                } else {
                    updateBook(data?.id, payload).then(r => {
                        handleReload();
                        onClose();
                        notification.success({
                            message: "Cập nhật sách thành công!"
                        });
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal
                title="Form nhập thông tin sách tiềm năng"

                style={{top: 20}}
                open={open}
                onCancel={onClose}
                cancelText="Đóng"
                okText={formType === "create" ? "Thêm sách" : "Cập nhật sách"}
                width={1000}
                okButtonProps={{
                    htmlType: "submit",
                    onClick: () => form.submit(),
                }}
            >
                <Form
                    initialValues={data2}
                    form={form}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    validateMessages={validateMessages}
                >

                    {/* Thong tin khach hang */}

                    <Row>
                        <Col span={24}>
                            <Text type="secondary">Thông tin </Text>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Tiêu đề" name="title" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Thông tin" name="description" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Giá" name="price" rules={[{required: true}]}>
                                <Input type="number"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tác giả" name="author" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>    
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default bookModal;
