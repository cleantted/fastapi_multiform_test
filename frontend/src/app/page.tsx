"use client"
import { useState, ChangeEventHandler, FormEventHandler } from 'react';


export default function Home() {
  const [image1, setImage1] = useState<File | undefined>(undefined);
  const [image2, setImage2] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [section1, setSection1] = useState("");
  const [section2, setSection2] = useState("");

  const getImage1: ChangeEventHandler<HTMLInputElement>  = (e) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    setImage1(img);
  };
  const getImage2: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    setImage2(img);
  };

  const Submit = async () => {
    const formdata = new FormData();
    if (image1 !== undefined) {
      formdata.append("file1", image1);
    }
    if (image2 !== undefined) {
      formdata.append("file2", image2);
    }

    formdata.append("title", title);
    formdata.append("section1", section1);
    formdata.append("section2", section2);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    await fetch("http://localhost:8000/upload", requestOptions);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Submit();
  };

  return (
    <div>
      <form className="box" onSubmit={handleSubmit}>

        <label className="label" htmlFor="title">
          タイトル
        </label>
        <div>
          <input
            id="title"
            type="text"
            required
            onChange={(e) => {setTitle(e.target.value)}}
          />
        </div>
        <br />
        <label className="label" htmlFor="section1">
          セクション1 
        </label>
        <div>
          <input
            id="section1"
            type="text"
            required
            onChange={(e) => {setSection1(e.target.value)}}
          />
        </div>
        <label className="label" htmlFor="img1">
          画像1
        </label>
        <div>
          <input
            id="img1"
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={getImage1}
          />
        </div>
        <br />
        <label className="label" htmlFor="section2">
          セクション2 
        </label>
        <div>
          <input
            id="section2"
            type="text"
            required
            onChange={(e) => {setSection2(e.target.value)}}
          />
        </div>
        <label className="label" htmlFor="img2">
          画像2
        </label>
        <div>
          <input
            id="img2"
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={getImage2}
          />
        </div>
        <br />
        <button className="button is-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
