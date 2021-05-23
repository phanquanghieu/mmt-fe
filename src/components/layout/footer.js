import React from "react";

const Footer = () => {
  return (
    <div className="footer" style={{display:"flex", justifyContent: "space-around"}}>
      {/* <div className="aboutUse">
        <h4>Smart Card</h4>
        <p>Learn effectively using your own custom flashcards</p>
      </div> */}
      <div className="founder">
        <h4>Our Team</h4>
        <ul>
          <li>Phan Quang Hiếu</li>
          <li>Lê Dương Hưng</li>
          <li>Vũ Ngọc Cương</li>
          <li>Nguyễn Chí Dũng</li>
          <li>Phùng Huy Hùng</li>
        </ul>
      </div>
      <div className="contact">
        <h4>Contact</h4>
        <ul>
          <li>
            <i class="material-icons">edit_location</i>
            Hà Đông - Hà Nội
          </li>
          <li>
            <i class="material-icons">phone_iphone</i>
            Phone: 0977275069
          </li>
          <li>
            <i class="material-icons">email</i>
            Email: email@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
