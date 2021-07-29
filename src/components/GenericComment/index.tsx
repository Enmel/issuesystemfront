import React from 'react';
import { Card, Avatar} from 'antd';

export type CommentData = {
    avatar?: string,
    author?: string,
    datetime?: React.ReactElement,
    content?: string
}

const GenericComment: React.FC<CommentData> = (item) => {

    const html = item.content ?? "";
    return (
        <>
        <Card
            title={
                <>
                <Avatar src={item.avatar}></Avatar> {item.author} comento {item.datetime}
            </>
            }
            style={{border: "1px solid #adc6ff", marginBottom: "1rem"}}
            size="small"
            headStyle={{display: "flex", justifyContent: "start", backgroundColor: "#fafafa", borderBottom: "1px solid #adc6ff"}}
        >
            <div dangerouslySetInnerHTML={ {__html: html} } />
        </Card>
        </>
    );
};

export {GenericComment};