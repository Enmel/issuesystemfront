import React from 'react';
import { Popover, Avatar, Typography} from 'antd';
import { User} from "../../../services/Members";

interface Props {
    user?: User
}

const PopOverUser: React.FC<Props> = ({user}) => {

    const { Text, Link } = Typography;

    return (
        <Popover 
            content={
                <Text type="secondary">{user?.email}</Text>
            }
            
            title={
                <>
                    <Avatar src={user?.picture}></Avatar> {user?.name}
                </>
            }
        >
            <span> {user?.name} </span>
        </Popover>
    );
}

export {PopOverUser};