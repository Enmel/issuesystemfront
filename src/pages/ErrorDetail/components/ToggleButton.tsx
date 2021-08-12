import React from 'react';
import { Popconfirm, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props {
    state?: string,
    loading: boolean,
    handleClose: () => void
}

const ToggleButton: React.FC<Props> = ({state, loading, handleClose}) => {

    if(state !== "Pending") {
        return (
            <Popconfirm 
                title="Esta accion marcara el error como abierto"                        
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