import React from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { baseUrl } from "@/config/webservice";

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

type UploadAvatarState = {
    loading: boolean,
    imageUrl: string | undefined
}

interface Props {
    imageUrl?: string
    onChangeImage?: (file: any) => void
  }

const UploadAvatar: React.FC<Props> = ({imageUrl, onChangeImage}) => {

    const [uploadAvatarState, setUploadAvatarState] = React.useState<UploadAvatarState>({
        loading: false,
        imageUrl: imageUrl
    })

    const handleChange = (info: UploadChangeParam<UploadFile<any>>)  => {
    
        if (info.file.status === 'uploading') {
            setUploadAvatarState({ loading: true, imageUrl: undefined });
            return;
        }

        if (info.file.status === 'done') {
            
            if(onChangeImage !== undefined){
                onChangeImage(info.file.response);
            }

            setUploadAvatarState({loading: false, imageUrl: info.file.response.url});
        }
    }

    const uploadButton = (
        <div>
            {uploadAvatarState.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Subir</div>
        </div>
    );

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={baseUrl + "/files"}
            onChange={handleChange}
            beforeUpload={beforeUpload}
    >
        {uploadAvatarState.imageUrl ? <img src={uploadAvatarState.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
}

export {UploadAvatar};