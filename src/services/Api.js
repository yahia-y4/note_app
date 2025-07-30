
const BASE_URL = "https://note-app.somee.com";

export async function addUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return { error: "حدث خطأ في الاضافة, اعد المحاولة بمعلومات مختلفة" };
    }
    console.log("تمت اضافة المستخدم ");
    return { success: true };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return { error: "خطاء في اسم المستخدم او كلمة المرور" };
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    console.log("تم تسجيل الدخول ");
    return { success: true };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function addNote() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { error: "خطا في المصادقة, قم باعادة تسجيل الدخول" };
  }

  try {
    const response = await fetch(`${BASE_URL}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "العنوان ", content: "المحتوى" }),
    });

    if (!response.ok) {
      return { error: "خطأ في اضافة المذكرة" };
    }
    console.log("تمت الاضافة");
    return { success: true };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function updateNote(id, title, content) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { error: "خطا في المصادقة, قم باعادة تسجيل الدخول" };
  }
  try {
    const response = await fetch(`${BASE_URL}/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      return { error: "فشل تحديث المذكرة" };
    }
    console.log("تم تحديث المذكرة ");
    return { success: true };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function getNotes() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { error: " قم بتسجيل الدخول" };
  }
  try {
    const response = await fetch(`${BASE_URL}/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { error: "خطاء في جلب الملاحظات" };
    }
    const data = await response.json();
    return { data };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function deleteNote(id) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { error: "خطا في المصادقة, قم باعادة تسجيل الدخول" };
  }
  try {
    const response = await fetch(`${BASE_URL}/softdelete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.NotFound) return { error: "هذه المذكرة غير موجودة لحذفها" };
    return { success: true };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}

export async function getMyUserName() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { error: " قم بتسجيل الدخول" };
  }
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return { error: "حدث خطأ في استلام اسم المستخدم" };
    }
    const username = await response.json();
    return { username };
  } catch {
    return { error: "حدث خطأ اثناء الاتصال بالخادم" };
  }
}
