import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import CustomToolbar from "./CustomToolbar";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

// ReactQuill dynamically imported for server-side rendering
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReactQuillInstance {
  getSelection: () => { index: number } | null;
  insertText: (index: number, text: string) => void;
  setSelection: (index: number) => void;
  insertEmbed: (index: number, type: string, value: string) => void;
}

interface EditorProps {
  placeholder: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>
  errors: FieldErrors
}
const Editor= ({ placeholder, register, setValue, errors}: EditorProps) => {
  const [editorHtml, setEditorHtml] = useState<string>("");

  const handleChange = (html: string) => {
    setEditorHtml(html);
    setValue("content", html, {shouldValidate: true}); // 폼의 필드에 에디터 내용 설정
  };

  useEffect(() => {
    console.log("html", editorHtml)
  }, [editorHtml])

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          const cursorPosition = editorHtml.length; // 또는 현재 커서 위치
          const quill = (document.querySelector('.text-editor .ql-editor') as any).quill;
          quill.insertEmbed(cursorPosition, 'image', base64Image);
        };
        reader.readAsDataURL(file);
      }
    };
  };


  return (
    <div className="text-editor">
      <CustomToolbar onImageUpload={handleImageUpload}/>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        placeholder={placeholder}
        modules={Editor.modules}
        formats={Editor.formats}
        theme={"snow"}
      />
            <input type="hidden" {...register("content", {required: true}) } />
            {errors.content && (
            <p className="text-red-500">본문 입력은 필수항목입니다.</p>
          )}
    </div>
  );
};

// Quill modules
Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
    
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

// Quill formats
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent", // 추가된 indent/ outdent 포맷
  "link",
  "image",
  "color",
  "align", // 추가된 align 포맷
];

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
