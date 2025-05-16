import { useState, useRef } from "react";
import ImageBill from "../assets/bill.png";
import { toast } from "react-toastify";
import { BillCreateStructure, ProcessedBill } from "../utils/types";
import { formatMoney } from "../utils";
import { Loading } from "../components/loading";
import { useNavigate } from "react-router-dom";
import { CLASSES, NAIRA_SYMBOL } from "../utils/constants";
import html2canvas from "html2canvas";

const initialStructure: BillCreateStructure = {
  key: "School Fees",
  value: 0,
  index: 0,
};

export function CreateBill() {
  const navigate = useNavigate();
  // const [createNewBill, setCreateNewBill] = useState(true);
  const [billStructure, setBillStructure] = useState<BillCreateStructure[]>([
    initialStructure,
  ]);
  const [screenPage, setScreenPage] = useState(1);
  // const [inPreview, setInPreview] = useState(false);
  const [loading] = useState(false);
  const [processing, setProcessing] = useState(false);
  // const [savingAsDraft, setSavingAsDraft] = useState(false);
  // const [sendingBill, setSendingBill] = useState(false);
  const [edit, setEdit] = useState(true);
  const [processedBill, setProcessedBill] = useState<ProcessedBill | null>(
    null
  );
  // const [lastReviewedTime, setLastReviewedTime] = useState(null);
  // const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState({
    class: "",
    session: "",
    student: "",
    parent: "",
  });
  const [discount, setDiscount] = useState({
    type: "",
    value: 0,
    useDiscount: false,
  });
  const componentRef = useRef(null);

  const handleAddToBillStructure = () => {
    if (!edit) setEdit(true);
    const hasEmptyKey = billStructure.find((el) => !el.key);
    if (hasEmptyKey) return toast.error("There is an undefined row");
    return setBillStructure([
      ...billStructure,
      { key: "", value: 0, index: billStructure.length },
    ]);
  };

  const handleMoveUp = (event: BillCreateStructure) => {
    const currentIndex = event.index;
    if (!currentIndex) return toast.error("There is an error somewhere");
    const nextContent = billStructure[event.index - 1];
    const nextContentIndex = nextContent.index;
    billStructure[event.index] = { ...nextContent, index: event.index };
    billStructure[nextContentIndex] = { ...event, index: nextContentIndex };
    setBillStructure([...billStructure]);
  };

  const handleMoveDown = (event: BillCreateStructure) => {
    const currentIndex = event.index;
    if (currentIndex > billStructure.length - 1)
      return toast.error("There is an error somewhere");
    const nextContent = billStructure[event.index + 1];
    const nextContentIndex = nextContent.index;
    billStructure[event.index] = { ...nextContent, index: event.index };
    billStructure[nextContentIndex] = { ...event, index: nextContentIndex };
    setBillStructure([...billStructure]);
  };

  const handleRemoveItem = (event: BillCreateStructure) => {
    console.log("clicked!!");
    if (!edit) setEdit(true);
    const selectedItem = billStructure.find((el) => el.index === event.index);
    if (!selectedItem)
      return toast.error(
        "Something is wrong. We cannot find the item to be removed!"
      );
    const billItems = billStructure
      .filter((el) => el.index !== selectedItem.index)
      .map((el, key) => ({ ...el, index: key }));
    setBillStructure([...billItems]);
  };

  const handleCheckForRequiredFields = () => {
    if (!user?.class || !user?.session || !user?.student || !user?.parent) {
      setProcessing(false);
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handleProcessBill = (type: string = "desktop") => {
    if (!handleCheckForRequiredFields()) return;
    console.log({ billStructure });
    const hasEmptyKey = billStructure.find((el) => !el.key);
    console.log({ hasEmptyKey });
    if (hasEmptyKey) {
      setProcessing(false);
      toast.error("There is an undefined row");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setEdit(false);
      // setProcessedBill({ ...processedBill, items: [...billStructure] });
      setProcessing(false);
      computeTotalValue();
      if (type === "mobile") setScreenPage(2);
    }, 2000);
  };

  const handleCancelBill = () => {
    // setProcessedBill([]);
    setProcessedBill(null);
    setEdit(true);
  };

  const computeTotalValue = () => {
    let amount = billStructure.reduce((acc, curr) => acc + curr.value, 0);
    console.log({ discount });
    const subtotal = amount;
    let discountValue = 0;
    if (discount?.value && discount.type) {
      if (discount.type?.toLowerCase() === "percentage")
        discountValue = amount * (discount.value / 100);
      if (discount.type?.toLowerCase() === "value")
        discountValue = discount?.value;
      console.log({ discountValue, discountType: discount?.type });
      if (amount > discountValue) amount = amount - discountValue;
      else amount = 0;
    }
    console.log({ amount });
    setProcessedBill({
      ...processedBill,
      items: [...billStructure],
      subtotal,
      total: amount,
      discount: discountValue,
    });
    setProcessing(false);
  };

  const downloadDivAsImage = async () => {
    const element = document.getElementById("bill-preview");
    if (!element) return;
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${user.student.concat("-")}-bill.png`;
    link.click();
  };

  return (
    <div className="container-fluid create-bill-container">
      <div className="header">
        <div className="title">
          <h4 className="logo"> LOGO </h4>
          <div className="divider" />
          <h5>Create School Bill</h5>
        </div>
        <div className="">
          <i
            className="bi bi-x close-item"
            onClick={() => navigate("/bills")}
          ></i>
        </div>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-md-6 col-12">
            {screenPage === 1 ? (
              <div className="_left">
                <h4>Invoice Details</h4>
                <div className="user__">
                  <label>Student Name</label>
                  <input
                    className="form-control"
                    placeholder="Student Name"
                    onChange={({ target: { value } }) =>
                      setUser({ ...user, student: value })
                    }
                    value={user.student}
                  />
                </div>{" "}
                <div className="user__">
                  <label>Parents/Guardian Name</label>
                  <input
                    className="form-control"
                    placeholder="Parent/Guardian Name"
                    onChange={({ target: { value } }) =>
                      setUser({ ...user, parent: value })
                    }
                    value={user.parent}
                  />
                </div>
                <div className="user__">
                  <label>Session</label>
                  <input
                    className="form-control"
                    placeholder="2025/2026"
                    onChange={({ target: { value } }) =>
                      setUser({ ...user, session: value })
                    }
                    value={user.session}
                  />
                </div>
                <div className="user__">
                  <label>Class</label>
                  <select
                    className="form-control"
                    onChange={({ target: { value } }) =>
                      setUser({ ...user, class: value })
                    }
                    value={user.class}
                  >
                    <option selected disabled>
                      Select Student's Class
                    </option>
                    {CLASSES.map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bill-structure">
                  <h3>Bill</h3>
                  <div className="structure-header">
                    <p>Description</p>
                    <p>Amount({NAIRA_SYMBOL})</p>
                  </div>
                  {billStructure.map((el) => (
                    <div className="item-wrapper" key={el.index}>
                      {billStructure.length > 1 ? (
                        !el.index ? (
                          <i
                            className="bi bi-arrow-down-circle-fill move-icon"
                            onClick={() => handleMoveDown(el)}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-arrow-up-circle-fill move-icon"
                            onClick={() => handleMoveUp(el)}
                          ></i>
                        )
                      ) : null}
                      <div className="item">
                        <div>
                          <li>
                            <input
                              className="form-control"
                              placeholder="Key Identifier"
                              value={el.key}
                              onChange={({ target: { value } }) => {
                                const row = billStructure[el.index];
                                row["key"] = value;
                                billStructure[el.index] = { ...row };
                                setBillStructure([...billStructure]);
                              }}
                              disabled={loading || !edit}
                            />
                          </li>
                        </div>
                        <div>
                          <li>
                            <input
                              className="form-control"
                              placeholder="Key Value"
                              value={`${NAIRA_SYMBOL} ${formatMoney(el.value)}`}
                              onChange={({ target: { value } }) => {
                                const row = billStructure[el.index];
                                const cleanedValue = Number(
                                  value.replace(/[^0-9]/g, "")
                                );
                                row["value"] = Number(cleanedValue);
                                billStructure[el.index] = { ...row };
                                setBillStructure([...billStructure]);
                              }}
                              disabled={loading || !edit}
                            />
                          </li>
                        </div>
                      </div>
                      {billStructure.length > 1 && el.index ? (
                        <p
                          onClick={() => handleRemoveItem(el)}
                          className="delete-icon"
                        >
                          Delete
                        </p>
                      ) : null}
                    </div>
                  ))}
                  <div className="add-new" onClick={handleAddToBillStructure}>
                    <i className="bi bi-node-plus"></i>Add New Line
                  </div>
                </div>
                <div className="extra-option">
                  <div>
                    <input
                      type="checkbox"
                      onChange={({ target: { value, checked } }) => {
                        console.log({ value, checked });
                        if (checked)
                          return setDiscount({
                            ...discount,
                            useDiscount: checked,
                          });
                        else
                          setDiscount({
                            useDiscount: false,
                            type: "",
                            value: 0,
                          });
                      }}
                    />
                    Add Discount
                  </div>
                  {discount?.useDiscount ? (
                    <select
                      className="form-select"
                      onChange={({ target: { value } }) =>
                        setDiscount({ ...discount, type: value })
                      }
                      value={discount.type}
                    >
                      <option>Select Format</option>
                      {["Percentage", "Value"].map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  ) : null}
                  {discount?.type ? (
                    <input
                      className="form-control value-taker"
                      onChange={({ target: { value } }) =>
                        setDiscount({ ...discount, value: Number(value) })
                      }
                    />
                  ) : null}
                </div>
                <div className="footer">
                  {/* <p>Last saved: Today at 4:04pm</p> */}
                  <div className="actions _desktop">
                    <button
                      className="process"
                      onClick={() => handleProcessBill("desktop")}
                      disabled={processing}
                    >
                      {processing ? <Loading /> : "Process"}
                    </button>
                    <button className="draft">Save as Draft</button>
                    <button className="cancel" onClick={handleCancelBill}>
                      Cancel
                    </button>
                    <button className="send">Send Bill</button>
                  </div>
                  <div className="actions _mobile">
                    <button
                      className="process"
                      onClick={async () => {
                        await handleProcessBill("mobile");
                      }}
                      disabled={loading || processing}
                    >
                      {loading || processing ? <Loading /> : "Process"}
                    </button>
                    {/* <button className='draft'>Save as Draft</button> */}
                    <button className="cancel">Cancel</button>
                    {/* <button className='send'>Send Bill</button> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mobile-preview">
                <BillPreviewMobile
                  edit={edit && screenPage === 1}
                  setEdit={(edit) => {
                    setEdit(edit);
                    setScreenPage(1);
                  }}
                  processedBill={processedBill}
                  user={user}
                  componentRef={componentRef}
                  downloadDivAsImage={downloadDivAsImage}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 _right">
            <div className="content">
              <div className="header">
                <h5>
                  Preview <i className="bi bi-info-circle"></i>
                </h5>
                <div className="actions">
                  <div
                    className={`edit ${!edit ? "active" : ""}`}
                    onClick={() => {
                      console.log({ edit });
                      if (edit) return;
                      setEdit(true);
                    }}
                  >
                    <i className="bi bi-pen edit"></i>Edit
                  </div>
                  <div onClick={downloadDivAsImage}>
                    <i className="bi bi-file-earmark-pdf-fill"></i>PDF
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope"></i>Email
                  </div>
                  <div className="">
                    <i className="bi bi-file-spreadsheet"></i> Payment page
                  </div>
                </div>
              </div>
              <div className="bill-preview" ref={componentRef}>
                <div className="header__">
                  <h3>The Crystal School</h3>
                  <div className="info">
                    <div className="left">
                      <h6>Bill For</h6>
                      <p>{user?.class || "-"}</p>
                    </div>
                    <div className="right">
                      <h6>{user?.student || "-"}</h6>
                      <p>{user?.session || "-"}</p>
                    </div>
                  </div>
                </div>
                {processedBill?.items?.length ? (
                  <div className="body__">
                    <div className="title">
                      <p>Description</p>
                      <p>Amount</p>
                    </div>
                    {processedBill?.items.map((el) => (
                      <ul key={el?.key}>
                        <li>{el?.key}</li>
                        <li>
                          {NAIRA_SYMBOL} {formatMoney(el?.value)}
                        </li>
                      </ul>
                    ))}
                    <div className="totals">
                      <div className="">
                        <p>Subtotal</p>
                        <p>
                          {NAIRA_SYMBOL}
                          {formatMoney(processedBill?.subtotal || 0)}
                        </p>
                      </div>
                      <div className="">
                        <p>Discount (10%)</p>
                        <p>
                          {NAIRA_SYMBOL}
                          {formatMoney(processedBill?.discount || 0)}
                        </p>
                      </div>
                      <div className="bolder">
                        <p className="">Total</p>
                        <p>
                          {NAIRA_SYMBOL}
                          {formatMoney(processedBill?.total || 0)}
                        </p>
                      </div>
                      <div className="bolder">
                        <p>Amount Due</p>
                        <p>
                          {NAIRA_SYMBOL}
                          {formatMoney(processedBill?.total || 0)}
                        </p>
                      </div>
                    </div>
                    <div className="payment">
                      <div className="qr">
                        <i className="bi bi-qr-code"></i>
                      </div>
                      <p>
                        You can send the money{" "}
                        <b>
                          <i>
                            {NAIRA_SYMBOL}{" "}
                            {formatMoney(processedBill?.total || 0)}{" "}
                          </i>
                        </b>{" "}
                        to <b>ACCESS BANK</b>
                        <i className="bi bi-dot"></i>
                        <b>01291019101</b> <i className="bi bi-dot"></i>
                        <b>The Crystal School</b>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="empty__bill_container">
                    <img
                      src={ImageBill}
                      alt="img-bill"
                      className="form-control"
                    />
                    <h4>Bill has not been processed yet!</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillPreviewMobile({
  edit,
  setEdit,
  processedBill,
  user,
  componentRef,
  downloadDivAsImage,
}: {
  edit: boolean;
  setEdit: (value: boolean) => void;
  processedBill: ProcessedBill | null;
  user: {
    class: string;
    session: string;
    student: string;
    parent: string;
  };
  componentRef: React.RefObject<HTMLDivElement | null>;
  downloadDivAsImage: () => void;
}) {
  return (
    <div className="mobile-preview__">
      <div className="header">
        <h5>
          Preview <i className="bi bi-info-circle"></i>
        </h5>
        <div className="actions">
          <div
            className={`edit ${!edit ? "active" : ""}`}
            onClick={() => {
              console.log({ edit });
              if (edit) return;
              setEdit(true);
            }}
          >
            <i className="bi bi-pen edit"></i>
            <span>Edit</span>
          </div>
          <div onClick={downloadDivAsImage}>
            <i className="bi bi-file-earmark-pdf-fill"></i>
            <span>PDF</span>
          </div>
          <div className="email">
            <i className="bi bi-envelope"></i>
            <span>Email</span>
          </div>
          <div className="">
            <i className="bi bi-file-spreadsheet"></i>
            <span>Payment page</span>
          </div>
        </div>
      </div>
      <div className="bill-preview" id="bill-preview" ref={componentRef}>
        <div className="header__">
          <h3>The Crystal School</h3>
          <div className="info">
            <div className="left">
              <h6>Bill For</h6>
              <p>{user?.class || "-"}</p>
            </div>
            <div className="right">
              <h6>{user?.student || "-"}</h6>
              <p>{user?.session || "-"}</p>
            </div>
          </div>
        </div>
        {processedBill?.items?.length ? (
          <div className="body__">
            <div className="title">
              <p>Description</p>
              <p>Amount</p>
            </div>
            {processedBill?.items.map((el) => (
              <ul key={el?.key}>
                <li>{el?.key}</li>
                <li>
                  {NAIRA_SYMBOL} {formatMoney(el?.value)}
                </li>
              </ul>
            ))}
            <div className="totals">
              <div className="">
                <p>Subtotal</p>
                <p>
                  {NAIRA_SYMBOL}
                  {formatMoney(processedBill?.subtotal || 0)}
                </p>
              </div>
              {processedBill?.discount ? (
                <div className="">
                  <p>Discount (10%)</p>
                  <p>
                    {NAIRA_SYMBOL}
                    {formatMoney(processedBill?.discount || 0)}
                  </p>
                </div>
              ) : null}
              <div className="bolder">
                <p className="">Total</p>
                <p>
                  {NAIRA_SYMBOL}
                  {formatMoney(processedBill?.total || 0)}
                </p>
              </div>
              <div className="bolder">
                <p>Amount Due</p>
                <p>
                  {NAIRA_SYMBOL}
                  {formatMoney(processedBill?.total || 0)}
                </p>
              </div>
            </div>
            <div className="payment">
              <div className="qr">
                <i className="bi bi-qr-code"></i>
              </div>
              <div className="payment-instruction">
                <p>Please pay your fees to the account below:</p>
                <p>
                  <span>Bank Name:</span>Access Bank
                </p>
                <p>
                  <span>Account Number:</span> 1392001900
                </p>
                <p>
                  <span>Account Name:</span> The Crystal Height School
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty__bill_container">
            <img src={ImageBill} alt="img-bill" className="form-control" />
            <h4>Bill has not been processed yet!</h4>
          </div>
        )}
      </div>
    </div>
  );
}
