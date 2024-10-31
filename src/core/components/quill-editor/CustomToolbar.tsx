import React, { FC } from "react";

const CustomToolbar: FC<{ onImageUpload: () => void }> = ({ onImageUpload }) => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="" />
    </select>

    {/* 글자 타입 */}
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />

    {/* 색깔 */}
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option value="" />
    </select>

    {/* 리스트 만들기 */}
    <button className="ql-list" value="ordered" type="button"/>
    <button className="ql-list" value="bullet" type="button"/>

    {/* 인덴트 */}
    <button className="ql-indent" value="-1" type="button" />
    <button className="ql-indent" value="+1" type="button" />

    {/* 정렬 */}
    <button className="ql-align" value={""} type="button" />  
    <button className="ql-align" value="center" type="button" />  
    <button className="ql-align" value="right" type="button" /> 


{/* 이미지 추가 */}
    <button className="ql-image" onClick={onImageUpload} type="button">
      Insert Image
    </button>

  </div>
);

export default CustomToolbar;