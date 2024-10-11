import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadSlicer";
import { updateProduct, uploadImage } from "../apicalls/products";
import { MdDelete } from "react-icons/md";


const Images = ({ setShowForm, selectedProduct, getData }) => {
  const [showPreview, setPreview] = useState(true);
  const [images, setImages] = useState(selectedProduct.images);
  const [file = null, setFile] = useState(null);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      dispatch(setLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productID", selectedProduct._id);
      const response = await uploadImage(formData);
      dispatch(setLoader(true));
      getData();
      setShowForm(false);
      if (response.success) {
        message.success(response.message);
        setPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteImage = async(image)=>{
    try{
      dispatch(setLoader(true));
      const updatedImages = images.filter((img)=> img!==image);
      const updatedProduct = {...selectedProduct, images: updatedImages};
      const response = await updateProduct(selectedProduct._id, updatedProduct);
      dispatch(setLoader(false));
      if(response.success){
        message.success("Image deleted successfully");
        setImages(updatedImages);
        getData();
      }else{
        throw new Error(response.message);
      }
    }catch(error){
      dispatch(setLoader(false));
      message.error(error.message);
    }
  }

  return (
    <div>
      <div className="flex mb-2 gap-3">
          {images.map((image) => {
            return (
              <div className="flex gap-2 border border-solid border-gray-500 rounded p-3 items-end">
                <img className="h-20 w-20 object-cover" src={image} />
                <MdDelete size={20} onClick={()=>{deleteImage(image)}}/>
              </div> 
            );
          })}
        </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">Upload Images</Button>
      </Upload>

      <div className="flex justify-end gap-4 mt-2">
        <Button
          type="primary"
          onClick={() => {
            setShowForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
