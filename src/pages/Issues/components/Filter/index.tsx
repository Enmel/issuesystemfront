import React from 'react';
import { Button, Select, Tooltip } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Group } from '@services/Groups';
import { User } from '@services/Members';

interface Props {
    onChangeProject?: (value : string) => void,
    projects?: Group[],
    onChangeAuthor?: (value : string) => void,
    authors?: User[],
    onChangeStatus?: () => string,
    open?: number,
    closed?: number
}

const Filter: React.FC<Props> = ({onChangeProject, projects, onChangeAuthor, authors, onChangeStatus, open, closed}) => {

    const [statusSelected, selectStatus] = React.useState<string>("OPEN");

    const { Option } = Select;

    const onChangeProjectCallback = (value: string) => {
        if(onChangeProject){
            onChangeProject(value);
        }
    }

    const onChangeAuthorCallback = (value: string) => {
        if(onChangeAuthor){
            onChangeAuthor(value);
        }
    }

    const onChangeStatusCallback = () => {
        if(onChangeStatus){
            selectStatus(onChangeStatus());
        }
    }

    const ButtonOpen = () => {
        
        let button;

        if(statusSelected === "OPEN") {

            button = <Button icon={<ExclamationCircleTwoTone twoToneColor="#eb2f96"/>} type="ghost">Abiertas {open}</Button>;
        }

        button = <Button icon={<ExclamationCircleTwoTone twoToneColor="#eb2f96"/>} onClick={onChangeStatusCallback}>Abiertas {open}</Button>
        return (
            <Tooltip title="Numero de incidencias pendientes">
                {button}
            </Tooltip>
        );
    }

    const ButtonClosed = () => {

        let button;

        if(statusSelected === 'CLOSE') {
            button = <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} type="ghost">Cerradas {closed}</Button>;
        }

        button = <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} onClick={onChangeStatusCallback}>Cerradas {closed}</Button>
        return (
            <Tooltip title="Numero de incidencias cerradas">
                {button}
            </Tooltip>
        );
    }

    return (
        <div style={{display: "flex", justifyContent:"space-between"}}>
            <div>
                <ButtonOpen/>
                <ButtonClosed/>
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

            <Select
                showSearch
                style={{ width: 200 }}
                defaultValue="TODOS"
                onChange={onChangeAuthorCallback}
                placeholder="Autor"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="TODOS" key={0}>Todos los autores</Option>
                {
                    authors?.map((author) => <Option value={author.id} key={author.id}>{author.name}</Option>)
                }
            </Select>
        </div>
    );
}

export {Filter};