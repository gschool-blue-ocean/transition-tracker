import React from "react";
import ChatModal from '../Chat/ChatModal';

export default function StudentPage({ userData, socket }) {

   return <>
      {userData.admin ?
         <>
            <h1>Admin view</h1>
            <ChatModal socket={socket} />
         </>
         :
         <>
            <h1>Student view</h1>
            <ChatModal socket={socket} />

         </>
      }
   </>
}
