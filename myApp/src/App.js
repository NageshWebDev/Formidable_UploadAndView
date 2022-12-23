import react, { useState } from 'react';
import style from './App.module.css';

export default function App() {

  const [selectedFile, setSelectedFile] = useState('')
  const [selectedMultipleFile, setSelectedMultipleFile] = useState([])
  const [resJSON, setResJSON] = useState(false)
  const [resJSONM, setResJSONM] = useState(false)
  const [getFilePath, setGetFilePath] = useState("")
  const [getMFilePath, setGetMFilePath] = useState()

  function onChangeHandler(event) {
    const tempFile = event.target.files[0];
    setSelectedFile(tempFile);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    console.log("onSubmitHandler")

    const form = new FormData()
    console.log(selectedFile)
    form.append('myFile', selectedFile)

    const response = await fetch('/api/upload', {
      method: "post",
      body: form
    })

    const responseJSON = await response.json();
    console.log(responseJSON)
    setResJSON(true)
    setResJSONM(false)
    setGetFilePath(responseJSON)
  }

  function onChangeMultipleHandler(event) {
    const multipleSelectedFile = event.target.files;
    setSelectedMultipleFile(multipleSelectedFile);
  }

  async function onSubmitMultipleHandler(event) {
    event.preventDefault();
    console.log(selectedMultipleFile[0]);
    console.log(selectedMultipleFile[1]);
    console.log(selectedMultipleFile.length);

    const form = new FormData();
    for (let i = 0; i < selectedMultipleFile.length; i++) {
      form.append(`myFiles`, selectedMultipleFile[i])
    }

    const response = await fetch('/api/uploadMultiple', {
      method: "post",
      body: form
    })

    const responseJSON = await response.json();
    setResJSONM(true)
    setResJSON(false)
    setGetMFilePath(responseJSON)
  }

  return (
    <react.Fragment>
      <main  className={style.main}>
        <section  className={style.section}>
          <h1 className={style.h1}><code>File upload with Formidable npm package</code></h1>
          <form onSubmit={onSubmitHandler}>
            <div  className={style.div}>
              <input onChange={onChangeHandler} type="file" required/>
              <input type="submit" value="Upload Single file"  className={style.btn} />
            </div>
          </form>


          <form onSubmit={onSubmitMultipleHandler}>
            <div  className={style.div}>
              <input onChange={onChangeMultipleHandler} type="file" multiple required/>
              <input type="submit" value="Upload Multiple File"  className={style.btn} />
            </div>
          </form>
          {
            resJSON &&
            <a href={require(`./${getFilePath}`)} className={style.a}>{getFilePath}</a>
          }
          {
            resJSONM &&
            <div  className={style.div_col}>
              {
                getMFilePath.map(item => {
                  return (
                    <a href={require(`./${item}`)} className={style.a}>{item}</a>
                  )
                })
              }
            </div>
          }
        </section>
      </main>
    </react.Fragment>
  );
}