import { quillFormats, quillModules } from "@/core/types/Quill";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import { Quill } from "react-quill";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  register: UseFormRegister<any>;
  trigger: UseFormTrigger<any>;
  name: string;
  errors: FieldErrors;
  placeholder: string
}
export const QuillEditor = ({
  value,
  onChange,
  register,
  trigger,
  name,
  errors,
  placeholder
}: QuillEditorProps) => {
  const modules = useMemo(() => quillModules, []);

  return (
    <>
      <QuillWrapper
        {...register(name, { required: true })}
        theme={"snow"}
        placeholder={placeholder}
        value={value}
        modules={modules}
        formats={quillFormats}
        onChange={onChange}
        onBlur={() => {
          trigger(name); // Trigger validation on blur
        }}
      />
      {errors.content && (
        <p className="text-red-500">본문내용은 필수항목입니다.</p>
      )}
    </>
  );
};
