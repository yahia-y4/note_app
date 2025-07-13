import "./TextField.css";

export default function TextField({title_value,content_value,onChange_title,onChange_content}) {
  
  return (
    <div className="Text_field_div">

      <input onChange={onChange_title} value={title_value} className="input_c" type="text" />
      <textarea onChange={onChange_content} value={content_value} className="textarea_c" name="" id=""></textarea>
      
    </div>
  );
}
