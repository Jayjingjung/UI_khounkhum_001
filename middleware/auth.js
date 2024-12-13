// middleware/auth.js
export default function ({ store, redirect }) {
    const token = store.state.auth.token || localStorage.getItem('token');
    console.log('Token from localStorage:', token);
  
    // ถ้าไม่มี token ให้ redirect ไปหน้า login
    if (!token) {
      return redirect('/');
    }
  
    // กรณีที่ token ไม่ตรงกับ 'UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF' 
    // จะไม่สามารถเข้าถึงหน้า dashboard ได้
    const validToken = 'UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF';
  
    if (token !== validToken) {
      return redirect('/'); // หรือหน้าอื่นที่ต้องการให้ไป
    }
  
    // ถ้า token ถูกต้อง ให้เข้าไปหน้า dashboard ได้
  }
  