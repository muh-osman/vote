import style from "./ThankYou.module.scss";
// Images
// import overlay from "../../Assets/Images/logo-2.png";
import leftLogo from "../../Assets/Images/logo-left.png";
import rightLogo from "../../Assets/Images/Minstry.png";

export default function ThankYou() {
  return (
    <div className={style.container}>
      <nav>
        <div className={style.right_logo}>
          <img src={rightLogo} alt="logo" />
        </div>
        <div className={style.left_logo}>
          <img src={leftLogo} alt="logo" />
        </div>
      </nav>

      <div className={style.overlay}>
        {/* <div className={style.img_box}>
          <img src={overlay} alt="overlay" />
        </div> */}

        <div>
          <h1>شكرا</h1>
          <h2>لمشاركتك في التصويت</h2>
        </div>
      </div>
    </div>
  );
}
