import axios from "axios";
import toast from "react-hot-toast";

export const login_toast = () => {
  toast.success("Login Successfully.", {
    style: {
      borderRadius: "10px",
      background: "#252525",
      color: "#ffffff",
      fontSize: "small",
    },
  });
};

export const login_toast_error = () => {
  toast.error("Please Fill Credentials!", {
    style: {
      borderRadius: "10px",
      background: "#252525",
      color: "#ffffff",
      fontSize: "small",
    },
  });
};

export const save_toast = () => {
  toast.success("Saving Changes.", {
    style: {
      borderRadius: "10px",
      background: "#252525",
      color: "#ffffff",
      fontSize: "small",
    },
  });
};

export const save_toast_error = (e) => {
  toast.error(`Couldn't Save Changes, ${e}`, {
    style: {
      borderRadius: "10px",
      background: "#252525",
      color: "#ffffff",
      fontSize: "small",
    },
  });
};

export const checkInputValues = (input) => {
  if (input?.amount?.category_6 < 99) {
    toast.error("Custom song request amount to be 99 or above!", {
      style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#ffffff",
        fontSize: "small",
      },
    });
  } else if (input?.amount?.category_7 < 79) {
    toast.error("Regular song request amount to be 79 or above!", {
      style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#ffffff",
        fontSize: "small",
      },
    });
  } else if (input?.amount?.category_8 < 59) {
    toast.error("Regular song request amount to be 59 or above!", {
      style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#ffffff",
        fontSize: "small",
      },
    });
  } else if (input?.amount?.category_9 < 39) {
    toast.error("Regular song request amount to be 39 or above!", {
      style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#ffffff",
        fontSize: "small",
      },
    });
  } else if (input?.amount?.category_10 < 19) {
    toast.error("Regular song request amount to be 19 or above!", {
      style: {
        borderRadius: "10px",
        background: "#252525",
        color: "#ffffff",
        fontSize: "small",
      },
    });
  }
};

export const signin = async (username, password, setUser, navigate) => {
  const api = "https://stg.dhunjam.in/account/admin/login";

  try {
    if (username && password) {
      const res = await axios.post(api, { username, password });

      if (res.status === 200) {
        setUser(res?.data);
        login_toast();
        navigate("/admin");
      } else {
        login_toast_error();
      }
    } else {
      login_toast_error();
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserDetails = async (userId, userToken, setData) => {
  const api = `https://stg.dhunjam.in/account/admin/${userId}`;

  try {
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (res.status === 200) {
      setData(res?.data?.data);
    } else {
      console.error(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleInputChange = (input, setInput, e) => {
  const { name, value, type } = e.target;
  const inputValue = type === "radio" ? value === "true" : value;

  if (type === "radio") {
    setInput((prev) => ({ ...prev, [name]: inputValue }));
  } else {
    setInput((prev) => ({
      ...prev,
      amount: { ...prev.amount, [name]: inputValue },
    }));
  }
};

export const updateHandle = async (userId, inputData, setData, setInput) => {
  const apiURL = `https://stg.dhunjam.in/account/admin/${userId}`;

  try {
    const res = await axios.put(apiURL, {
      charge_customers: inputData?.charge_customers,
      amount: inputData?.amount,
    });

    if (res.status === 200) {
      setData((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          charge_customers: res.data.data.charge_customers,
          amount: { ...res.data.data.amount },
        },
      }));

      setInput({
        charge_customers: res.data.data.charge_customers,
        amount: { ...res.data.data.amount },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const verifyValues = (input) => {
  if (
    input?.amount?.category_6 >= 99 &&
    input?.amount?.category_7 >= 79 &&
    input?.amount?.category_8 >= 59 &&
    input?.amount?.category_9 >= 39 &&
    input?.amount?.category_10 >= 19
  ) {
    return true;
  }
  return false;
};
