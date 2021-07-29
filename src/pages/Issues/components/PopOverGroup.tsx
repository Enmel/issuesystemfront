import React from 'react';
import { Popover, Avatar } from 'antd';
import { Link } from "react-router-dom";
import {Group} from "@services/Groups";

interface Props {
    group?: Group
}

const PopOverGroup: React.FC<Props> = ({group}) => {

    return (
        <Popover 
            content={
                <>
                <Avatar src={group?.picture.url}></Avatar> <span>{group?.name}</span>
                </>
            }
        >
            <Link to={"/a/groups/" + group?.id}>{group?.name}</Link>
        </Popover>
    );
}

export {PopOverGroup};