"use client";

import { logout } from "@/actions/logout";



export default  function SettingsPage() {

    const onClick = () => {
      logout();
    }
  return (
    <div>
        <button  onClick={onClick} type="submit">
            Sing Out
        </button>
    </div>
  )
}
