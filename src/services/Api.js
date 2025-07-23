class ToBackEnd {

  async addUser(username, password) {
    try{
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
    }catch(e){
      console.log(e)
    }
   
  }

  async login(username, password) {
    try {
      const response = await fetch("http://localhost:5069/login", {
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
        console.error("خطأ في تسجيل الدخول");
        return;
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("authToken", token);
      console.log("تم تسجيل الدخول، والتوكن:", token);
    } catch (error) {
      console.error("خطأ أثناء الاتصال:", error);
    }
  }
async addNote(){
  const token = localStorage.getItem("authToken")
  if(!token){
    return 0
  }
  try{
  const response = await fetch("http://localhost:5069/addnote",{
    method:"POST",
    headers:{
      
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({
      title:"",
      content:""
    })
  })
  if(!response.ok){
    console.error("error")
  }
     const result = await response.json()
      console.log("تمت اضافة المذكرة",result)
  }catch(e){
    console.log(e)
  }

}
  async savedate(title, content, id) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("لا يوجد توكن مخزن، الرجاء تسجيل الدخول أولاً");
      return;
    }

    try {
      const response = await fetch("http://localhost:5069/updatenote/" + id, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        console.error("خطأ في تحديث المذكرة");
        return;
      }

      const result = await response.json();
      console.log("تم تحديث المذكرة:", result);
    } catch (error) {
      console.error("حدث خطأ:", error);
    }
  }
}

class FromBackEnd {
  constructor(){
      this.allItems=[]
      this.showItems()
  }
  async getItems() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("not find token in local srorage")
      return ;
    }
    try {
      const response = await fetch("http://localhost:5069/getnotes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("erroe");
        return;
      }
      return response.json()
    } catch (e) {
      console.error(e);
    }
  }
  async showItems(){
    this.allItems = await this.getItems()
    if(this.allItems){
console.log(this.allItems)
    }
    
  }
}

class Handling {}
const handling_c = new Handling();
const FromBackEnd_c = new FromBackEnd();
const ToBackEnd_c = new ToBackEnd();

export { ToBackEnd_c, FromBackEnd_c, handling_c };
