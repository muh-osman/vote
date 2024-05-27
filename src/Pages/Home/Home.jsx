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

      <p dir="rtl">عذرا.. انتهى التصويت</p>

      <footer>
        جميع الحقوق محفوظة © مهرجان الخليج للإذاعة والتلفزيون 2024
      </footer>
    </div>
  );
}
