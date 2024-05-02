import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import { TiSocialInstagram } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import usegetCurrentuser from "../Hooks/usegetCurrentuser";

function Socialmedia() {
  const navigate = useNavigate();
  // const {currentuser} = usegetCurrentuser([]);
  // console.log(currentuser);

  return (
    <div className="head head2">
      <div className="social-firstcon">
        <div className="sidebar">
          <p className="medialogo">
            <TiSocialInstagram />
            Media
          </p>
          <ul>
            <li>
              <GoHomeFill className="icon" />
              <span>Home</span>
            </li>
            <li>
              <FaSearch className="icon" />
              <span>Search</span>
            </li>
            <li onClick={()=>navigate('/createpost')}>
              <MdAddCircleOutline className="icon" />
              <span>Post</span>
            </li>
            <li>
              <TbMessage className="icon" />
              <span>Message</span>
            </li>
          </ul>
        </div>
        <div className="media-secondcon">
          <div className="media-card">
            <div className="media-card-header">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
              />
              <span>ironman</span>
            </div>
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
            <div className="likemessshare">
              <FaRegHeart />
              <BiMessageSquareDetail />
            </div>
            <span className="comment">Lorem ipsum dolor sit Lorem ipsum dolor sit amet.</span>
          </div>
        </div>
        <div className="media-thirdcon"></div>
      </div>
    </div>
  );
}

export default Socialmedia;
