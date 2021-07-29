import { Tag } from 'antd';

const ErrorTag: React.FC<{type: string}> = ({type}) => {

    if(type === "Blocker"){
        return <Tag color="red">Tipo: Blocker</Tag>;
    }

    if(type === "Critical"){
        return <Tag color="volcano">Tipo: Critico</Tag>;
    }

    if(type === "Major"){
        return <Tag color="orange">Tipo: Mayor</Tag>;
    }

    if(type === "Normal"){
        return <Tag color="geekblue">Tipo: Normal</Tag>;
    }

    if(type === "Minor"){
        return <Tag color="blue">Tipo: Menor</Tag>;
    }

    if(type === "Trivial"){
        return <Tag color="default">Tipo: Trivial</Tag>;
    }

    return (<></>);
}

export {ErrorTag}