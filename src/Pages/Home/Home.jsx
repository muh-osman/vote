// SASS
import style from "./Home.module.scss";
// React
import { useState } from "react";
// Logo
import leftLogo from "../../Assets/Images/logo-left.jpg";
import rightLogo from "../../Assets/Images/logo-right.jpg";
// Images
import A from "../../Assets/Images/المتوحش.webp";
import B from "../../Assets/Images/باهار.webp";
import C from "../../Assets/Images/ع أمل.webp";
import D from "../../Assets/Images/لعبة حب.webp";
import E from "../../Assets/Images/ما فيي.webp";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={style.container}>
      <nav>
        <div className={style.left_logo}>
          <img src={leftLogo} alt="logo" />
        </div>
        <div className={style.right_logo}>
          <img src={rightLogo} alt="logo" />
        </div>
      </nav>

      <h4>جائزة تصويت الجمهور</h4>
      <p dir="rtl">
        وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف
        الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا
      </p>

      <div className={style.form_box}>
        <form>
          <div className={style.label_box}>
            {/* 1 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "option1" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("option1")}
              >
                <img src={A} alt="Option 1" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={() => handleOptionChange("option1")}
                />
                المتوحش
              </div>
            </label>

            {/* 2 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "option2" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("option2")}
              >
                <img src={B} alt="Option 2" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={() => handleOptionChange("option2")}
                />
                باهار
              </div>
            </label>

            {/* 3 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "option3" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("option3")}
              >
                <img src={C} alt="Option 3" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={() => handleOptionChange("option3")}
                />
                ع أمل
              </div>
            </label>

            {/* 4 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "option4" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("option4")}
              >
                <img src={D} alt="Option 4" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={() => handleOptionChange("option4")}
                />
                لعبة حب
              </div>
            </label>

            {/* 5 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "option5" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("option5")}
              >
                <img src={E} alt="Option 5" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="option5"
                  checked={selectedOption === "option5"}
                  onChange={() => handleOptionChange("option5")}
                />
                ما فيي
              </div>
            </label>
          </div>

          <div dir="rtl" className={style.name_and_phnone_box}>
            <label htmlFor="name">الأسم الثلاثي</label>
            <input type="text" name="name" id="name" required />

            <label htmlFor="phone-number">رقم الهاتف</label>
            <input dir="ltr" type="number" name="number" id="phone-number" required />

            <button>صوت الآن !</button>
          </div>
        </form>
      </div>
    </div>
  );
}
