import { useState } from "react";
import ImageOne from "../assets/maths.png";
import { toast } from "react-toastify";
import { BillCreateStructure } from "../utils/types";

const initialStructure: BillCreateStructure = {
  key: "School Fees",
  value: "",
  index: 0,
};

export function CreateBill() {
  const [createNewBill, setCreateNewBill] = useState(true);
  const [billStructure, setBillStructure] = useState<BillCreateStructure[]>([
    initialStructure,
  ]);

  console.log({ billStructure });

  const handleAddToBillStructure = () => {
    const hasEmptyKey = billStructure.find((el) => !el.key);
    if (hasEmptyKey) return toast.error("There is an undefined row");
    return setBillStructure([
      ...billStructure,
      { key: "", value: "", index: billStructure.length },
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

  return (
    <div className='container-fluid create-bill-container'>
      <div className='header'></div>
      {}
      <div className='bill-body'>
        {!createNewBill ? (
          <div
            className='create-wrapper'
            onClick={() => setCreateNewBill(true)}
          >
            <img src={ImageOne} alt='math-one' className='img-fluid' />
            <p>+ Create Bill</p>
          </div>
        ) : (
          <div className='bill-container'>
            <p>
              <select>
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
              </select>
              Term Bill
            </p>
            <p>2024/2026 SESSION</p>
            <ul>
              {billStructure.map((el) => (
                <div className='wrapper'>
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
                      />
                    </li>
                    <li>
                      <input
                        className='form-control'
                        placeholder='Key Value'
                        value={el.value}
                        onChange={({ target: { value } }) => {
                          const row = billStructure[el.index];
                          row["value"] = value;
                          billStructure[el.index] = { ...row };
                          setBillStructure([...billStructure]);
                        }}
                      />
                    </li>
                  </div>
                </div>
              ))}
              <button onClick={handleAddToBillStructure}>Add new row</button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
