import React, { useState } from "react";
import "./Warehouse.scss";
import {
  addWarehouse,
  deletewarehouse,
  editwarehouse,
  getAllWarehouse,
} from "../queries/warehouse.queries";
import { getAlldiscount } from "../queries/discount.queries";
import { getAllCategory } from "../queries/category.queries";
const statusHard = [
  {
    label: "Active",
    value: 1,
  },
  {
    label: "Deactive",
    value: 0,
  },
];
const showOnWebHard = [
  {
    label: "Show",
    value: 1,
  },
  {
    label: "Not Show",
    value: 0,
  },
];
export const Warehouse = () => {
  const [idDelete, setIdDelelet] = useState();
  const [list, setList] = React.useState();
  const [warehouseCode, setwarehouseCode] = useState("");
  const [termOfUse, settermOfUse] = useState();
  const [bannerUrl, setbannerUrl] = useState("");
  const [thumbnailUrl, setthumbnailUrl] = useState();
  const [discountAmount, setdiscountAmount] = useState();
  const [maxDiscountAmount, setmaxDiscountAmount] = useState();
  const [showOnWeb, setshowOnWeb] = useState();
  const [capacity, setcapacity] = useState();
  const [voucherChannel, setvoucherChannel] = useState();
  const [discountTypeCode, setdiscountTypeCode] = useState();
  const [categoryCode, setcategoryCode] = useState();
  const [description, setdescription] = useState();
  const [status, setStatus] = useState();
  const [availableFrom, setavailableFrom] = useState("");
  const [availableTo, setavailableTo] = useState("");
  const [name, setname] = useState();
  const [objEdit, setObjEdit] = useState();
  const [objDelete, setObjDelete] = useState();
  const [discountList, setDiscountList] = useState();
  const [categoryList, setcategoryList] = useState();
  const handelEdit = async () => {
    if (!objEdit) {
      return alert("Please select item");
    }
    const rs = await editwarehouse(objEdit);
    if (rs?.status === "Success") {
      // alert(rs?.message);
      const newspaperSpinning = [
        {
          backgroundColor: "white",
        },
        {
          backgroundColor: "rgb(221 215 209)",
        },
      ];
      const newspaperTiming = {
        duration: 500,
      };
      const ele = document.querySelector(`.wrapper .list #anim`);
      ele.animate(newspaperSpinning, newspaperTiming);
      const newlist = await getAllWarehouse();
      return setList(newlist);
    }
    if (rs?.status === "Failed") {
      alert("Edit Failed");
    }
  };
  const handelAdd = async () => {
    const obj = {
      warehouseCode: warehouseCode,
      name: name,
      status: status,
      termOfUse: termOfUse,
      bannerUrl: bannerUrl,
      description: description,
      thumbnailUrl: thumbnailUrl,
      discountAmount: discountAmount,
      maxDiscountAmount: maxDiscountAmount,
      availableFrom: availableFrom,
      availableTo: availableTo,
      showOnWeb: showOnWeb,
      capacity: capacity,
      voucherChannel: voucherChannel,
      discountTypeCode: discountTypeCode,
      categoryCode: categoryCode,
    };
    const rs = await addWarehouse(obj);
    if (rs?.status === "Success") {
      const newlist = await getAllWarehouse();
      return setList(newlist);
    }
    if (rs?.status === "Failed") {
      return alert(rs?.message);
    }
  };
  const handelDelelet = async () => {
    if (!idDelete) {
      alert("Please enter valid ID");
      return;
    }
    const rs = await deletewarehouse(idDelete, objDelete);
    if (rs?.status === "Success") {
      alert(`Delete  ${idDelete} successfull`);
      const newlist = await getAllWarehouse();
      return setList(newlist);
    }
  };

  React.useEffect(() => {
    getAlldiscount().then((rs) =>
      setDiscountList(rs?.map((item) => item.code))
    );
    getAllCategory().then((rs) =>
      setcategoryList(rs?.map((item) => item.categoryCode))
    );
    getAllWarehouse().then((rs) => {
      setList(rs);
    });
  }, []);
  React.useEffect(() => {
    discountList && setdiscountTypeCode(discountList[0]);
    categoryList && setcategoryCode(categoryList[0]);
  }, [discountList, categoryList]);
  console.log(list);

  return (
    <div className="wrapper">
      <div className="list">
        <div className="list-wrapper">
          <h2>Data</h2>
          <div className="item head">
            <div className="a id">ID</div>
            <div className="a">warehouseCode</div>
            <div className="a">name</div>
            <div className="a">description</div>
            <div className="a">termOfUse</div>
            <div className="a">bannerUrl</div>
            <div className="a">thumbnailUrl</div>
            <div className="a">discountAmount</div>
            <div className="a">maxDiscountAmount</div>
            <div className="a">capacity</div>
            <div className="a">voucherChannel</div>
            <div className="a">discountTypeCode</div>
            <div className="a">categoryCode</div>
            <div className="a">status</div>
            <div className="a">showOnWeb</div>
            <div className="a">availableFrom</div>
            <div className="a">availableTo</div>
          </div>
          {list && list?.length > 0
            ? list?.map((item, key) => {
                return (
                  <div
                    className="item"
                    key={key}
                    id={item?.id === objEdit?.id ? "anim" : ""}
                    onClick={() => {
                      setObjEdit(item);
                      setIdDelelet(item?.id);
                      setObjDelete(item);
                    }}
                  >
                    <div className="a id">{item?.id}</div>
                    <div className="a">{item?.warehouseCode}</div>
                    <div className="a">{item?.name}</div>
                    <div className="a">{item?.description}</div>
                    <div className="a">{item?.termOfUse}</div>
                    <div className="a">{item?.bannerUrl}</div>
                    <div className="a">{item?.thumbnailUrl}</div>
                    <div className="a">{item?.discountAmount}</div>
                    <div className="a">{item?.maxDiscountAmount}</div>
                    <div className="a">{item?.capacity}</div>
                    <div className="a">{item?.voucherChannel}</div>
                    <div className="a">{item?.discountTypeCode}</div>
                    <div className="a">{item?.categoryCode}</div>
                    <div
                      className={item?.status === 0 ? "a deactive" : "a active"}
                    >
                      {item?.status === 0 ? "Deactive" : "Active"}
                    </div>
                    <div
                      className={
                        item?.showOnWeb === 0 ? "a deactive" : "a active"
                      }
                    >
                      {item?.showOnWeb === 0 ? "Not show" : "show"}
                    </div>
                    <div className="a">{item?.availableFrom}</div>
                    <div className="a">{item?.availableTo}</div>
                  </div>
                );
              })
            : "No data"}
        </div>
      </div>
      <div className="actions">
        <div className="action">
          <h4>ID : {objEdit?.id}</h4>
          <div className="form">
            <input
              type="text"
              name=""
              id=""
              placeholder="warehouseCode"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.warehouseCode = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.warehouseCode}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="name"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.name = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.name}
            />
            <div
              onChange={(e) => {
                let obj = { ...objEdit };
                obj.status = e.target.value;
                setObjEdit(obj);
              }}
            >
              {statusHard?.map((item) => {
                return (
                  <label>
                    <input
                      checked={Number(objEdit?.status) === Number(item.value)}
                      type="radio"
                      value={item.value}
                    />
                    {item?.label}
                  </label>
                );
              })}
            </div>
            <div
              onChange={(e) => {
                let obj = { ...objEdit };
                obj.showOnWeb = e.target.value;
                setObjEdit(obj);
              }}
            >
              {showOnWebHard?.map((item) => {
                return (
                  <label>
                    <input
                      checked={
                        Number(objEdit?.showOnWeb) === Number(item.value)
                      }
                      type="radio"
                      value={item.value}
                    />
                    {item?.label}
                  </label>
                );
              })}
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="description"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.description = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.description}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="termOfUse"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.termOfUse = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.termOfUse}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="bannerUrl"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.bannerUrl = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.bannerUrl}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="thumbnailUrl"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.thumbnailUrl = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.thumbnailUrl}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="discountAmount"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.discountAmount = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.discountAmount}
            />
            <input
              type="number"
              name=""
              id=""
              placeholder="maxDiscountAmount"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.maxDiscountAmount = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.maxDiscountAmount}
            />

            <input
              type="number"
              name=""
              id=""
              placeholder="capacity"
              onChange={(e) => {
                let ob = { ...objEdit };
                ob.capacity = e.target.value;
                setObjEdit(ob);
              }}
              defaultValue={objEdit?.capacity}
            />

            <label htmlFor="">Discount type </label>
            <select
              onChange={(e) => {
                let obj = { ...objEdit };
                obj.discountTypeCode = e.target.value;
                setObjEdit(obj);
              }}
            >
              {discountList?.map((item) => {
                return (
                  <option
                    value={item}
                    selected={item === objEdit?.discountTypeCode ? true : false}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
            <label htmlFor="">Category</label>

            <select
              onChange={(e) => {
                let obj = { ...objEdit };
                obj.categoryCode = e.target.value;
                setObjEdit(obj);
              }}
            >
              {categoryList?.map((item) => {
                return (
                  <option
                    value={item}
                    selected={item === objEdit?.categoryCode ? true : false}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn" onClick={() => handelEdit()}>
            Edit
          </div>
        </div>
        <div className="action">
          <div className="form">
            <input
              type="text"
              name=""
              id=""
              placeholder="warehouseCode"
              onChange={(e) => setwarehouseCode(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="name"
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="description"
              onChange={(e) => setdescription(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="termOfUse"
              onChange={(e) => settermOfUse(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="bannerUrl"
              onChange={(e) => setbannerUrl(e.target.value)}
            />
            <div onChange={(e) => setStatus(e.target.value)}>
              {statusHard?.map((item) => {
                return (
                  <label>
                    <input
                      checked={Number(status) === Number(item.value)}
                      type="radio"
                      value={item.value}
                    />
                    {item?.label}
                  </label>
                );
              })}
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="thumbnailUrl"
              onChange={(e) => setthumbnailUrl(e.target.value)}
            />
            <input
              type="number"
              name=""
              id=""
              placeholder="maxDiscountAmount"
              onChange={(e) => setmaxDiscountAmount(e.target.value)}
            />{" "}
            <input
              type="number"
              name=""
              id=""
              placeholder="discountAmount"
              onChange={(e) => setdiscountAmount(e.target.value)}
            />{" "}
            <div onChange={(e) => setshowOnWeb(e.target.value)}>
              {showOnWebHard?.map((item) => {
                return (
                  <label>
                    <input
                      checked={Number(showOnWeb) === Number(item.value)}
                      type="radio"
                      value={item.value}
                    />
                    {item?.label}
                  </label>
                );
              })}
            </div>
            <input
              type="number"
              name=""
              id=""
              placeholder="capacity"
              onChange={(e) => setcapacity(e.target.value)}
            />{" "}
            <input
              type="number"
              name=""
              id=""
              placeholder="voucherChannel"
              onChange={(e) => setvoucherChannel(e.target.value)}
            />{" "}
            <input
              disabled
              type="text"
              name=""
              id=""
              placeholder="availableFrom"
              onChange={(e) => setavailableFrom(e.target.value)}
            />{" "}
            <input
              disabled
              type="text"
              name=""
              id=""
              placeholder="availableTo"
              onChange={(e) => setavailableTo(e.target.value)}
            />
            <label htmlFor="">Discount type </label>
            <select onChange={(e) => setdiscountTypeCode(e.target.value)}>
              {discountList?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <label htmlFor="">Category </label>
            <select onChange={(e) => setcategoryCode(e.target.value)}>
              {categoryList?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="btn" onClick={() => handelAdd()}>
            Add
          </div>
        </div>
        <div className="action">
          <div className="form">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter valid id"
              defaultValue={idDelete}
              onChange={(e) => setIdDelelet(e.target.value)}
            />
          </div>
          <div className="btn" onClick={() => handelDelelet()}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
