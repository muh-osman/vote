// SASS
import style from "./Home.module.scss";
// Logo
import leftLogo from "../../Assets/Images/logo-left.jpg";
import rightLogo from "../../Assets/Images/logo-right.jpg";
export default function Home() {
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
      <p dir="rtl">وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا وصف الجائزة هنا</p>

    </div>
  );
}
