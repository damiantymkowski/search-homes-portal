import React, { RefObject, useRef, useState } from "react";
import axios from "axios";

interface initialValues {
  title: string;
  category: string;
  description: string;
  type_build: string;
  area: string;
  rent: string;
  price: string;
  localization: string;
  rooms_number: string;
  phone_number: string;
  photos: [];
}

const useCreateOffer = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [currentElement, setCurrentElement] = useState("");
  const [loginInfo, setLoginInfo] = useState("");
  const [items, setItems] = useState([]);
  const [photos, setPhotos] = useState([{}] as any);

  function search(nameKey: any, myArray: any) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let miniature;

    if (items.length > 0) {
      let obj;
      for (let i = 0; i < photos.length; i++) {
        if (photos[i][items[0]["id"]]) obj = photos[i];
      }
      miniature = obj[items[0]["id"]];
    } else miniature = Object.entries(photos[1])[0][1];

    const formData = new FormData();
    formData.append("file", miniature as Blob);
    formData.append("api_key", "394891673392181");
    formData.append("upload_preset", "xg6vo39n");

    let arr = [] as any;
    const { data } = await axios(
      "https://api.Cloudinary.com/v1_1/:dukhbkqnv/image/upload",
      {
        method: "POST",
        data: formData,
      }
    );
    arr[0] = data.url;

    for (let i = 0; i < photos.length; i++) {
      if (
        miniature != photos[i][Object.keys(photos[Object.keys(photos)[i]])[0]]
      ) {
        let formData1 = new FormData();
        formData1.append(
          "file",
          photos[i][Object.keys(photos[Object.keys(photos)[i]])[0]] as Blob
        );
        formData1.append("api_key", "394891673392181");
        formData1.append("upload_preset", "xg6vo39n");

        try {
          const { data } = await axios(
            "https://api.Cloudinary.com/v1_1/:dukhbkqnv/image/upload",
            {
              method: "POST",
              data: formData1,
            }
          );
          arr.push(data.url);
        } catch (err) {
          console.log(err);
        }
      }
    }

    let myArray = {
      1: inputs.type_build,
      2: inputs.area,
      3: inputs.localization,
      4: inputs.rooms_number,
    };
    axios({
      method: "post",
      url: "postEditor.php",
      data: {
        params: myArray,
        title: inputs.title,
        description: inputs.description,
        photos: arr,
        price: inputs.price,
        action: "savePostNew",
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
    setCurrentElement(e.target.value);

    if (e.currentTarget.files !== null) {
      let obj;
      obj = photos;
      obj.push({ [e.currentTarget.name]: e.currentTarget.files[0] });
      setPhotos(obj);
    }
  };

  return { handleSubmit, handleInputChange, loginInfo, setItems };
};
export default useCreateOffer;
