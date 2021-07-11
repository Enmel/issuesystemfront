import React, { FC } from 'react';
import { Tooltip } from 'antd';
import {CrownTwoTone, CrownOutlined, LaptopOutlined, SmileOutlined} from '@ant-design/icons';

type RoleProps = {
    role : string
};

const SuperAdminRole: FC = () => {
    return (
        <Tooltip placement="top" title={"SuperAdmin"}>
            <CrownTwoTone twoToneColor={"#ffbf00"} className="standar-icon role-icon"/>
        </Tooltip>
    );
};

const AdminRole: FC = () => {
    return (
        <Tooltip placement="top" title={"Admin"}>
            <CrownOutlined className="standar-icon role-icon"/>
        </Tooltip>
    );
};

const DeveloperRole: FC = () => {
    return (
        <Tooltip placement="top" title={"Desarrollador"}>
            <LaptopOutlined className="standar-icon role-icon"/>
        </Tooltip>
    );
};

const CollaboratorRole: FC = () => {
    return (
        <Tooltip placement="top" title={"Colaborador"}>
            <SmileOutlined className="standar-icon role-icon"/>
        </Tooltip>
    );
};

const Role: FC<RoleProps> = (props) => {

    const { role } = props;

    if(role === 'SuperAdmin') {
        return <SuperAdminRole/>;
    }

    if(role === 'Admin') {
        return <AdminRole/>;
    }

    if(role === 'Developer') {
        return <DeveloperRole/>;
    }

    return (<CollaboratorRole></CollaboratorRole>);
};

export {Role};
