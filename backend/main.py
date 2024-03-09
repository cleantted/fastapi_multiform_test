from fastapi import FastAPI, Form, UploadFile
import shutil

app = FastAPI()


@app.post("/upload")
async def upload(
    title: str = Form(),
    section1: str = Form(),
    section2: str = Form(),
    file1: UploadFile = Form(),
    file2: UploadFile = Form(),
):
    try:
        path1 = f"upload/{file1.filename}"
        path2 = f"upload/{file2.filename}"

        with open(path1, "wb+") as f1, open(path2, "wb+") as f2:
            shutil.copyfileobj(file1.file, f1)
            shutil.copyfileobj(file2.file, f2)
        
        print(f"title: {title}, section1: {section1}, section2: {section2}")
        return '{"acknowrage":"true"}'
    except:
        return '{"acknowrage":"false"}'


@app.get("/")
async def ping():
    return '{"status":"ok"}'
