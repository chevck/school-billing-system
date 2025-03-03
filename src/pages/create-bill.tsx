import { useMemo, useState } from "react";
import ImageOne from "../assets/maths.png";
import { toast } from "react-toastify";
import { BillCreateStructure } from "../utils/types";
import { formatMoney } from "../utils";
import { Loading } from "../components/loading";
import { useNavigate } from "react-router-dom";
import { CLASSES, NAIRA_SYMBOL } from "../utils/constants";

const initialStructure: BillCreateStructure = {
  key: "School Fees",
  value: 0,
  index: 0,
};

export function CreateBill() {
  const navigate = useNavigate();
  const [createNewBill, setCreateNewBill] = useState(true);
  const [billStructure, setBillStructure] = useState<BillCreateStructure[]>([
    initialStructure,
  ]);
  const [inPreview, setInPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log({ billStructure, inPreview });

  const handleAddToBillStructure = () => {
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

  const handleProcessBill = () => {
    const hasEmptyKey = billStructure.find((el) => !el.key);
    if (hasEmptyKey) return toast.error("There is an undefined row");
    setLoading(true);
    setTimeout(() => {
      setInPreview(true);
      setLoading(false);
    }, 2000);
  };

  console.log({ inPreview });

  const totalAmount = useMemo(() => {
    return billStructure.reduce((acc, curr) => acc + curr.value, 0);
  }, [billStructure]);

  return (
    <div className='container-fluid create-bill-container'>
      <div className='header'>
        <div className='title'>
          <h4 className='logo'> LOGO </h4>
          <div className='divider' />
          <h5>Create School Bill</h5>
        </div>
        <div className=''>
          <i
            className='bi bi-x close-item'
            onClick={() => navigate("/bills")}
          ></i>
        </div>
      </div>
      <div className='content'>
        <div className='row'>
          <div className='col-6'>
            <div className='_left'>
              <h4>Invoice Details</h4>
              <div className='user__'>
                <label>Student Name</label>
                <input className='form-control' placeholder='Student Name' />
              </div>{" "}
              <div className='user__'>
                <label>Parents/Guardian Name</label>
                <input
                  className='form-control'
                  placeholder='Parent/Guardian Name'
                />
              </div>
              <div className='user__'>
                <label>Session</label>
                <input className='form-control' placeholder='2025/2026' />
              </div>
              <div className='user__'>
                <label>Class</label>
                <select className='form-control'>
                  <option selected disabled>
                    Select Student's Class
                  </option>
                  {CLASSES.map((el) => (
                    <option key={el}>{el}</option>
                  ))}
                </select>
              </div>
              <div className='bill-structure'>
                <h3>Bill</h3>
                <div className='structure-header'>
                  <p>Description</p>
                  <p>Amount({NAIRA_SYMBOL})</p>
                </div>
                {billStructure.map((el) => (
                  <div className='item' key={el.index}>
                    <div>
                      <i className='bi bi-arrow-down-circle-fill'></i>
                      <li>
                        <input
                          className='form-control'
                          placeholder='Key Identifier'
                          value={el.key}
                          onChange={({ target: { value } }) => {
                            const row = billStructure[el.index];
                            row["key"] = value;
                            billStructure[el.index] = { ...row };
                            setBillStructure([...billStructure]);
                          }}
                          disabled={loading}
                        />
                      </li>
                    </div>
                    <div>
                      <li>
                        <input
                          className='form-control'
                          placeholder='Key Value'
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
                          disabled={loading}
                        />
                      </li>
                      <i className='bi bi-trash delete-icon'></i>
                    </div>
                  </div>
                ))}
                <div className='add-new'>
                  <i className='bi bi-node-plus'></i>Add New Line
                </div>
              </div>
              <div className='extra-option'>
                <div>
                  <input type='checkbox' />
                  Add Discount
                </div>
                <select className='form-select'>
                  <option>Select Format</option>
                  {["Percentage", "Value"].map((el) => (
                    <option key={el}>{el}</option>
                  ))}
                </select>
                <input className='form-control value-taker' />
              </div>
              <div className='footer'>
                <p>Last saved: Today at 4:04pm</p>
                <div className='actions'>
                  <button className='cancel'>Cancel</button>
                  <button className='draft'>Save as Draft</button>
                  <button className='send'>Send Bill</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6 _right'>
            <div className='content'>
              <div className='header'>
                <h5>
                  Preview <i className='bi bi-info-circle'></i>
                </h5>
                <div className='actions'>
                  <div>
                    <i className='bi bi-file-earmark-pdf-fill'></i>PDF
                  </div>
                  <div className='email'>
                    <i className='bi bi-envelope'></i>Email
                  </div>
                  <div className=''>
                    <i className='bi bi-file-spreadsheet'></i> Payment page
                  </div>
                </div>
              </div>
              <div className='bill-preview'>
                <div className='header__'>
                  <h3>The Crystal School</h3>
                  <div className='info'>
                    <div className='left'>
                      <h6>Bill For</h6>
                      <p> Grade Three </p>
                    </div>
                    <div className='right'>
                      <h6>Gilmore Adebiyi</h6>
                      <p>2024/2025 SESSION</p>
                    </div>
                  </div>
                </div>
                <div className='body__'>
                  <div className='title'>
                    <p>Description</p>
                    <p>Amount</p>
                  </div>
                  {billStructure.map((el) => (
                    <ul>
                      <li>{el.key}</li>
                      <li>
                        {NAIRA_SYMBOL} {formatMoney(el.value)}
                      </li>
                    </ul>
                  ))}
                  <div className='totals'>
                    <div className=''>
                      <p>Subtotal</p>
                      <p>
                        {NAIRA_SYMBOL}
                        {formatMoney(totalAmount)}
                      </p>
                    </div>
                    <div className=''>
                      <p>Discount (10%)</p>
                      <p>
                        {NAIRA_SYMBOL}
                        {formatMoney(totalAmount)}
                      </p>
                    </div>
                    <div className='bolder'>
                      <p className=''>Total</p>
                      <p>
                        {NAIRA_SYMBOL}
                        {formatMoney(totalAmount)}
                      </p>
                    </div>
                    <div className='bolder'>
                      <p>Amount Due</p>
                      <p>
                        {NAIRA_SYMBOL}
                        {formatMoney(totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className='payment'>
                    <div className='qr'>
                      <i className='bi bi-qr-code'></i>
                    </div>
                    <p>
                      You can send the money{" "}
                      <b>
                        <i>
                          {NAIRA_SYMBOL} {formatMoney(totalAmount)}{" "}
                        </i>
                      </b>{" "}
                      to <b>ACCESS BANK</b>
                      <i className='bi bi-dot'></i>
                      <b>01291019101</b> <i className='bi bi-dot'></i>
                      <b>The Crystal School</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {inPreview ? (
        <div className='edit-bar'>
          <button onClick={() => setInPreview(false)}>Edit</button>
          <button>Save</button>
        </div>
      ) : null}
      <div className='bill-body'>
        {!createNewBill ? (
          <div
            className='create-wrapper'
            onClick={() => setCreateNewBill(true)}
          >
            <img src={ImageOne} alt='math-one' className='img-fluid' />
            <p>+ Create Bill</p>
          </div>
        ) : inPreview ? (
          <div className='preview-bill-form'>
            <div className='header'>
              <h3>The Crystal School</h3>
              <div className='timing'>
                <div className=''>
                  <p>1st Term School</p>
                  <p>2024/2025 Session</p>
                </div>
                <div className=''>
                  <p>Bill For</p>
                  <p>Reception</p>
                </div>
              </div>
            </div>
            <div className='list'>
              <div className='title'>
                <p>Description</p>
                <p>Amount</p>
              </div>
              <div className='bill-items'>
                {billStructure.map((el) => (
                  <div className='item' key={el.index}>
                    <p>{el.key}</p>
                    <p>#{formatMoney(el.value)}</p>
                  </div>
                ))}
              </div>
              <div className='totals'>
                <p>Total</p>
                <p>#{formatMoney(totalAmount)}</p>
              </div>
              <div className='payment-info'>
                <div className='payment-qr'>
                  <i className='bi bi-qr-code'></i>
                </div>
                <p>
                  If you cannot scan, please pay into <span>ACCESS BANK</span>
                  <i className='bi bi-dot'></i>
                  <span>345666643222</span>
                  <i className='bi bi-dot'></i>
                  <span>#{formatMoney(totalAmount)}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='bill-form-wrapper'>
            <div className='create-bill-form'>
              <p className='term'>
                <select className='form-control terms-select'>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                </select>
                Term Bill
              </p>
              <p>2024/2026 SESSION</p>
              <ul>
                {billStructure.map((el) => (
                  <div className='wrapper' key={el?.index}>
                    <div className='controls'>
                      {billStructure.length > 1 ? (
                        !el.index ? (
                          <i
                            className='bi bi-arrow-down-circle-fill'
                            onClick={() => handleMoveDown(el)}
                          ></i>
                        ) : (
                          <i
                            className='bi bi-arrow-up-circle-fill'
                            onClick={() => handleMoveUp(el)}
                          ></i>
                        )
                      ) : null}
                      {billStructure.length > 1 && el.index ? (
                        <i
                          className='bi bi-x-circle cancel'
                          onClick={() => handleRemoveItem(el)}
                        ></i>
                      ) : null}
                    </div>

                    <div className='_values-container'>
                      <li>
                        <input
                          className='form-control'
                          placeholder='Key Identifier'
                          value={el.key}
                          onChange={({ target: { value } }) => {
                            const row = billStructure[el.index];
                            row["key"] = value;
                            billStructure[el.index] = { ...row };
                            setBillStructure([...billStructure]);
                          }}
                          disabled={loading}
                        />
                      </li>
                      <li>
                        <input
                          className='form-control'
                          placeholder='Key Value'
                          value={el.value}
                          onChange={({ target: { value } }) => {
                            const row = billStructure[el.index];
                            row["value"] = Number(value);
                            billStructure[el.index] = { ...row };
                            setBillStructure([...billStructure]);
                          }}
                          disabled={loading}
                        />
                      </li>
                    </div>
                  </div>
                ))}
              </ul>
              <div className='totals'>
                <ul className='total'>
                  <li>Total</li>
                  <li>#{formatMoney(totalAmount)}</li>
                </ul>
              </div>
              <button onClick={handleAddToBillStructure}>Add new row</button>
            </div>
            <button
              className='create-btn'
              onClick={handleProcessBill}
              disabled={loading}
            >
              {loading ? <Loading /> : "Preview Bill"}
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
}
