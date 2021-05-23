import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { createSetCard } from "../../api/flashcard";
import authCtx from "../../contexts/auth";
import { useAsync } from "react-hook-async";
import { uploadFile } from "../../api/file";
import Modal from "../modal";
import withAuth from "../../hoc/authHoc";

import { Footer } from "../layout";

const AddForm = () => {
  let fileInput;
  const { authUser } = useContext(authCtx);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [share, setShare] = useState(false);
  const [avatar, setAvatar] = useState("public/demo.jpg");

  const [cardKeyword, setCardKeyword] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [cardDetailArr, setCardDetailArr] = useState([]);
  const [uploadFileApi, callUploadFileApi] = useAsync(null, uploadFile);
  const [createSetCardData, fetchCreateSetCard] = useAsync(null, createSetCard);
  const onChooseImage = (event) => {
    console.log(event);
    if (event.target.files.length < 1) return;
    callUploadFileApi(event.target.files[0], authUser.token).then((res) =>
      setAvatar(res.data)
    );
  };
  function handleSave() {
    if (!title || !description) {
      setMessage("You must enter title and description");
      setModalShow(true);
    } else {
      const data = {
        title,
        description,
        date_created: new Date().toISOString(),
        folder: [],
        empty: cardDetailArr.length === 0 ? true : false,
        share,
        finish: false,
        avatar,
        detail: cardDetailArr,
      };
      fetchCreateSetCard(authUser.token, data);
      // fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${authUser.token}`,
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => {
      //     setPostingStatus(true);
      //     return res.json();
      //   })
      //   .then(
      //     (result) => {
      //       console.log(result.date_created);
      //       setPostingStatus(false);
      //       setMessage("Create set successful");
      //       setModalShow(true);
      //     },
      //     (error) => {
      //       setMessage(error.message);
      //       setModalShow(true);
      //     }
      //   );
    }
  }
  function handleUpdateKeyword(val, idx) {
    const copyArr = [...cardDetailArr];
    copyArr[idx].card_title = val;
    setCardDetailArr(copyArr);
  }

  function handleUpdateDesc(val, idx) {
    const copyArr = [...cardDetailArr];
    copyArr[idx].card_desc = val;
    setCardDetailArr(copyArr);
  }
  function handleDeleteCardItem(index) {
    const coppyArr = [...cardDetailArr];

    coppyArr.splice(index, 1);

    setCardDetailArr(coppyArr);
  }
  function handlePushCardItem() {
    if (cardKeyword === "" || cardDesc === "") {
      setMessage("You must enter term and definition");
      setModalShow(true);
    } else {
      setCardDetailArr([
        ...cardDetailArr,
        {
          card_id: cardDetailArr.length + 1,
          card_title: cardKeyword,
          card_desc: cardDesc,
          card_completed: false,
        },
      ]);
      setCardDesc("");
      setCardKeyword("");
    }
  }
  // if (!createSetCardData.loading) {
  //   return (
  //     <div className="loading">
  //       <ReactLoading type="bubbles" color="#ffa5ab" />
  //     </div>
  //   );
  // } else
  return (
    <>
      {modalShow && (
        <Modal
          show={modalShow}
          message={message}
          onHide={() => {
            setModalShow(false);
            document.location.pathname = "/dashboard";
          }}
        ></Modal>
      )}

      <div className="set-meta">
        <div className="header-edit">
          <h3>Add this set card!</h3>
          <button className="finish" onClick={handleSave}>
            {!createSetCardData.loading ? "Save!" : "Saving..."}
          </button>
        </div>
        <div className="container">
          <div className="set-meta-wrapper">
            <div className="set-meta-form">
              <h1>Add new set</h1>

              <label htmlFor="set-title">Title</label>
              <input
                className="border-input"
                type="text"
                value={title}
                id="set-title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />

              <label htmlFor="set-desc">Description</label>
              <textarea
                className="border-grey"
                value={description}
                id="set-desc"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />

              <input
                type="checkbox"
                id="set-public"
                checked={share}
                value={1}
                onChange={(e) => setShare(e.target.checked)}
              />
              <label htmlFor="set-public">Public?</label>
            </div>

            <div>
              <div className="set-avatar">
                <div
                  className="avt"
                  style={{ width: "600px", height: "340px" }}
                >
                  {uploadFileApi.loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <ReactLoading type="bubbles" color="#ffa5ab" />
                    </div>
                  ) : (
                    <img
                      src={process.env.REACT_APP_API_DOMAIN + "/" + avatar}
                      alt=""
                      onClick={() => fileInput.click()}
                      style={{ width: "600px", height: "340px" }}
                      className="border rounded"
                    />
                  )}
                </div>
                <input
                  hidden
                  type="file"
                  className="file"
                  ref={(file) => (fileInput = file)}
                  onChange={onChooseImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="set-detail">
        <div className="container">
          {cardDetailArr.length > 0 &&
            cardDetailArr.map((item, idx) => (
              // card-detail-item
              <CardDetailItem
                key={item._id}
                stt={idx + 1}
                title={item.card_title}
                desc={item.card_desc}
                handleDelete={() => handleDeleteCardItem(idx)}
                handleUpdateKeyword={(e) =>
                  handleUpdateKeyword(e.target.value, idx)
                }
                handleUpdateDesc={(e) => handleUpdateDesc(e.target.value, idx)}
              />
            ))}

          <div className="card-detail-item">
            <div className="header">
              <span>Card item {cardDetailArr.length + 1}</span>
            </div>
            <div className="body">
              <div className="card-edit">
                <input
                  className="border-input"
                  type="text"
                  placeholder="Enter term"
                  value={cardKeyword}
                  onChange={(e) => setCardKeyword(e.target.value)}
                />
              </div>
              <div className="card-edit">
                <input
                  className="border-input"
                  placeholder="Enter Definition"
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="bnt-add">
              <button className="addThis" onClick={handlePushCardItem}>
                Add this card!
              </button>
            </div>
          </div>

          <button
            className="btn-update"
            onClick={handleSave}
            disabled={createSetCardData.loading}
          >
            {!createSetCardData.loading ? "Save!" : "Creating new set..."}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(AddForm);

const CardDetailItem = (props) => {
  const {
    key,
    stt,
    handleDelete,
    handleUpdateKeyword,
    handleUpdateDesc,
    title,
    desc,
  } = props;
  const [show, setShow] = useState(true);
  return (
    <div key={key} className="card-detail-item">
      <div className="header">
        <span>Card item {stt}</span>
        <div>
          {show ? (
            <span
              className="collapse-icon"
              title="Collapse this card"
              role="img"
              aria-label="collapse-icon"
              onClick={() => setShow(!show)}
            >
              <i class="material-icons">keyboard_arrow_up</i>
            </span>
          ) : (
            <span
              className="collapse-icon"
              title="Open this card"
              role="img"
              aria-label="collapse-icon"
              onClick={() => setShow(!show)}
            >
              <i class="material-icons">keyboard_arrow_down</i>
            </span>
          )}

          <button
            className="clear"
            onClick={handleDelete}
            title="Delete this card!"
          >
            <i class="material-icons">clear</i>
          </button>
        </div>
      </div>
      {show && (
        <div className="body">
          <div className="card-edit">
            <input
              className="border-input"
              type="text"
              placeholder="Enter term"
              value={title}
              onChange={handleUpdateKeyword}
            />
          </div>
          <div className="card-edit">
            <input
              className="border-input"
              placeholder="Enter Definition"
              value={desc}
              onChange={handleUpdateDesc}
            />
          </div>
        </div>
      )}
    </div>
  );
};
