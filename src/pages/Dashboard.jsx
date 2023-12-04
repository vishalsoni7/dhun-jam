import { useContext, useEffect, useState } from "react";
import { UserContext } from "../component/Context";

import { Chart } from "./Chart";
import {
  handleInputChange,
  updateHandle,
  fetchUserDetails,
  save_toast,
  save_toast_error,
  checkInputValues,
  verifyValues,
} from "../component/utils";

export const Dashboard = () => {
  const { data, setData } = useContext(UserContext);

  const credentialsFromLoacal = JSON.parse(localStorage.getItem("userData"));

  const {
    data: { id, token },
  } = credentialsFromLoacal;

  const [input, setInput] = useState({
    charge_customers: false,
    amount: {
      // category_6: 0,
      // category_7: 0,
      // category_8: 0,
      // category_9: 0,
      // category_10: 0,
    },
  });

  const disableInput = input?.charge_customers;

  const handleChange = (e) => {
    handleInputChange(input, setInput, e);
  };

  const updateData = async (e) => {
    e.preventDefault();

    try {
      console.log("updating");
      await updateHandle(data.id, input, setData, setInput);
      console.log("fetching");
      await fetchUserDetails(id, token, setData);
      save_toast();
    } catch (error) {
      console.error(error);
      save_toast_error(error);
    }
  };

  return (
    <div>
      <h1>
        {data?.name}, {data?.location}, on Dhun Jam
      </h1>

      <div className="chart">
        <div className="left">
          <p>Do you want to charge your customers for requesting songs?</p>{" "}
          <p> Custom song request amount- </p>{" "}
          <p> Regular song request amount, from high to low- </p>{" "}
        </div>

        <div className="right">
          <div className="radio">
            {" "}
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="charge_customers"
                id="yes-option"
                defaultValue="true"
                defaultChecked={data?.charge_customers}
              />
              Yes
            </label>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="charge_customers"
                id="no-option"
                defaultValue="false"
                defaultChecked={data?.charge_customers}
              />
              No
            </label>{" "}
          </div>
          <input
            className={!disableInput ? "grey_out-a" : "dashboard-input-a"}
            onChange={handleChange}
            type="number"
            id="yes"
            name="category_6"
            defaultValue={data?.amount?.category_6}
            disabled={!disableInput}
          />

          <div>
            <input
              className={!disableInput ? "grey_out-b" : "dashboard-input-b"}
              onChange={handleChange}
              type="number"
              id="yes"
              name="category_7"
              defaultValue={data?.amount?.category_7}
              disabled={!disableInput}
            />
            <input
              className={!disableInput ? "grey_out-b" : "dashboard-input-b"}
              onChange={handleChange}
              type="number"
              id="yes"
              name="category_8"
              defaultValue={data?.amount?.category_8}
              disabled={!disableInput}
            />
            <input
              className={!disableInput ? "grey_out-b" : "dashboard-input-b"}
              onChange={handleChange}
              type="number"
              id="yes"
              name="category_9"
              defaultValue={data?.amount?.category_9}
              disabled={!disableInput}
            />
            <input
              className={!disableInput ? "grey_out-b" : "dashboard-input-b"}
              onChange={handleChange}
              type="number"
              id="yes"
              name="category_10"
              defaultValue={data?.amount?.category_10}
              disabled={!disableInput}
            />{" "}
          </div>
        </div>
      </div>

      {input?.charge_customers && <Chart />}
      <div className="save-button-div">
        <button
          className={disableInput ? "save-button" : "save-button-gray-out"}
          onClick={updateData}
          disabled={!disableInput}
        >
          Save
        </button>
      </div>
    </div>
  );
};
