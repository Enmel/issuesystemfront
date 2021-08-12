import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

interface Props {
    state: string,
    style: React.CSSProperties
}

const StateIcon: React.FC<Props> = ({state, style = {}}) => {

    if(state === "OPEN") {
        return (
            <Tooltip title="Incidencia abierta">
                <ExclamationCircleTwoTone style={style} twoToneColor="#eb2f96"/>
            </Tooltip>
        );
    }

    return (
        <Tooltip title="Incidencia cerrada">
            <CheckCircleTwoTone style={style} twoToneColor="#52c41a" />
        </Tooltip>
    );
}

export {StateIcon};