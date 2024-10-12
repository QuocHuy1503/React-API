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
import {IStudent} from "@/app/students/interface";
import {createStudent, updateStudent} from "@/app/students/api";
import {notification} from "antd/lib";
import dayjs, {Dayjs} from "dayjs";

type Props = {
    open: boolean;
    onClose: () => void;
    formType: "create" | "update";
    data: IStudent | null;
    handleReload: () => void;
};

type FieldType = {
    first_name?: string;
    last_name?: string;
    password?: string;
    email?: string;

};

const validateMessages = {
    required: "Vui lòng nhập trường ${label}!",
    types: {
        email: "${label} không hợp lệ!",
        number: "${label} không hợp lệ!",
    }
};

const studentModal = ({open, onClose, formType, data, handleReload}: Props) => {
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
                    full_name: value.full_name,
                    birthday: value.birthday || null,
                    phone: value.phone,
                    email: value.email,
                    gender: value.gender || null,
                }
                form.resetFields();
                if (formType === "create") {
                    createStudent(payload).then(r => {
                        console.log(r)
                        handleReload();
                        onClose();
                        notification.success({
                            message: "Thêm sinh viên thành công!"
                        });
                    });
                } else {
                    updateStudent(data?.id, payload).then(r => {
                        handleReload();
                        onClose();
                        notification.success({
                            message: "Cập nhật sinh viên thành công!"
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
                title="Form nhập thông tin sinh viên tiềm năng"

                style={{top: 20}}
                open={open}
                onCancel={onClose}
                cancelText="Đóng"
                okText={formType === "create" ? "Thêm sinh viên" : "Cập nhật sinh viên"}
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
                            <Text type="secondary">Thông tin học sinh</Text>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Họ" name="first_name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Tên" name="last_name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        {/* <Col span={12}> */}
                            {/* <Form.Item<FieldType> label="Giới tính" name="gender">
                                <Select onChange={() => {
                                }} allowClear>
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Ngày sinh" name="birthday">
                                <DatePicker placeholder=""/>
                            </Form.Item>
                        </Col> */}
        

                        {/* <Col span={12}>
                            <Form.Item label="Số điện thoại" name="phone" rules={[{required: true}]}>
                                <Input disabled={formType === "update"}/>
                            </Form.Item>
                        </Col>
                         */}

                        <Col span={12}>
                            <Form.Item label="Email" name="email" rules={[{required: true, type: "email"}]}>
                                <Input/>
                            </Form.Item>
                        </Col>    
                    </Row>
                    {/* <Row>
                        <Col span={12}>
                            <Form.Item<FieldType> label="Địa chỉ nhà" name="address" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row> */}
                </Form>
            </Modal>
        </>
    );
};

export default studentModal;
