import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

interface Props {
    state: string
}

const StateIcon: React.FC<Props> = ({state}) => {

    if(state === "Pending") {
        return (
            <Tooltip title="Error pendiente">
                <ExclamationCircleTwoTone twoToneColor="#eb2f96"/>
            </Tooltip>
        );
    }

    return (
        <Tooltip title="Error cerrado">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Tooltip>
    );
}

export {StateIcon};