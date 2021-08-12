import React from 'react';
import { Popconfirm, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props {
    state?: string,
    loading: boolean,
    handleClose: () => void
}

const ToggleButton: React.FC<Props> = ({state, loading, handleClose}) => {

    if(state !== "OPEN") {
        return (
            <Popconfirm 
                title="Esta accion marcara la incidencia como abierta"                        
                onConfirm={() => {handleClose()}}
            >
                <Button 
                    type="primary"
                    icon={<ExclamationCircleOutlined className="standar-icon"/>}
                >
                    Abrir
                </Button>
            </Popconfirm>
        );
    }

    return (
        <Popconfirm 
            title="Esta accion marcara la incidencia como cerrada"                        
            onConfirm={() => {handleClose()}}
        >
            <Button 
                type="primary"
                icon={<ExclamationCircleOutlined className="standar-icon"/>}
                loading={loading}
            >
             Cerrar
            </Button>
        </Popconfirm>
    );
}

export {ToggleButton};