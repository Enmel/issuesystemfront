import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

interface Props {
    state: string
}

const StateIcon: React.FC<Props> = ({state}) => {

    if(state === "OPEN") {
        return (
            <Tooltip title="Incidencia abierta">
                <ExclamationCircleTwoTone twoToneColor="#eb2f96"/>
            </Tooltip>
        );
    }

    return (
        <Tooltip title="Incidencia cerrada">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Tooltip>
    );
}

export {StateIcon};