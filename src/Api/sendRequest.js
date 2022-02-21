const sendRequest = async (data) => {
  let res = await fetch("https://postman-echo.com/post", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json" 
    },
    body: data,
  });
  if (!res.ok) {
    res = await res.text();
    return { error: res };
  } else {
    res = await res.text();
    return { message: res };
  }
};

export default sendRequest;