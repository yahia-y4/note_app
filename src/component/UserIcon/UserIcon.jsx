import "./UserIcon.css";

export default function UserIcon({onClick}) {
  
  return (
    <div onClick={onClick} className="user_div">
            <img src="/img/user.png" alt="e" />

      
    </div>
  );
}
