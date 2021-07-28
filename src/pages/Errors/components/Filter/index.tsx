import React from 'react';
import { Button, Select, Tooltip } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Group } from '@services/Groups';

interface Props {
    onChangeProject?: (value : string) => void,
    projects?: Group[],
    onChangeStatus?: () => string,
    open?: number,
    closed?: number
}

const Filter: React.FC<Props> = ({onChangeProject, projects, onChangeStatus, open, closed}) => {

    const [statusSelected, selectStatus] = React.useState<string>("Pending");

    const { Option } = Select;

    const onChangeProjectCallback = (value: string) => {
        if(onChangeProject){
            onChangeProject(value);
        }
    }

    const onChangeStatusCallback = () => {
        if(onChangeStatus){
            selectStatus(onChangeStatus());
        }
    }

    const ButtonOpen : React.FC<{statusFilter: string}> = ({statusFilter}) => {
        
        let button;

        if(statusFilter === "Pending") {
            button = <Button icon={<ExclamationCircleTwoTone twoToneColor="#eb2f96"/>} type="primary">Pendientes {open}</Button>
        }else{
            button = <Button icon={<ExclamationCircleTwoTone twoToneColor="#eb2f96"/>} type="ghost" onClick={onChangeStatusCallback}> Pendientes {open}</Button>;
        }

        return (
            <Tooltip title="Numero de errores pendientes">
                {button}
            </Tooltip>
        );
    }

    const ButtonClosed : React.FC<{statusFilter: string}> = ({statusFilter}) => {

        let button;

        if(statusFilter === 'Resolved') {
            button = <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} type="primary">Resueltas {closed}</Button>
        }else{
            button = <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} type="ghost" onClick={onChangeStatusCallback}>Resueltas {closed}</Button>;
        }

        return (
            <Tooltip title="Numero de errores resueltos">
                {button}
            </Tooltip>
        );
    }

    return (
        <div style={{display: "flex", justifyContent:"space-between"}}>
            <div>
            <ButtonOpen statusFilter={statusSelected}/>
            <ButtonClosed statusFilter={statusSelected}/>
            </div>
            <Select
                showSearch
                style={{ width: 200 }}
                defaultValue="TODOS"
                onChange={onChangeProjectCallback}
                placeholder="Proyecto"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="TODOS" key={0}>Todos los proyectos</Option>
                {
                    projects?.map((project) => <Option value={project.id} key={project.id}>{project.name}</Option>)
                }
            </Select>
        </div>
    );
}

export {Filter};