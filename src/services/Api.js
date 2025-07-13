class ToBackEnd {
  constructor() {}

  async addUser(username, password) {
    const response = await fetch("http://localhost:5069/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    console.log("تم الإرسال بنجاح:", result);
  }

}


class FromBackEnd {
  constructor() {}
}

class handeling {
  constructor() {}
}

const ToBackEnd_c = new ToBackEnd()
export {ToBackEnd_c}