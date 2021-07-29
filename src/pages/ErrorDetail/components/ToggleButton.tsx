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
            <Button 
                type="ghost"
                disabled
                icon={<ExclamationCircleOutlined className="standar-icon"/>}
            >
                Resuelto
            </Button>
        );
    }

    return (
        <Popconfirm 
            title="Esta accion cerrara la entrada y evitara comentarios futuros sobre ella"                        
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