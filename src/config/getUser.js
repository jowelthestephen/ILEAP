import { getDocs, addDoc } from "firebase/firestore";


export const handleUser = async (authUser, usersRef, setActualUser, signedUpFor) => {
  const data = await getDocs(usersRef);
  const newUserList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  if (!authUser || !newUserList || !newUserList.length) {
    // Handle the case when authUser or newUserList is null/undefined/empty
    return;
  }

  let conditionMet = false;
  for (let i = 0; i < newUserList.length; i++) {
    let userdb = newUserList[i];
    if (userdb.userID === authUser.uid) {
      conditionMet = true;
      const userIndex = newUserList.findIndex(
        (userli) => userli.userID === authUser.uid
      );
      if (userIndex !== -1) {
        const trueUser = newUserList[userIndex];
        setActualUser(trueUser);
      }
      console.log("condition met!");
      break;
    }
  }
  
  if (conditionMet) {
    return;
  } else {
    await addDoc(usersRef, {
      username: authUser.displayName,
      userID: authUser.uid,
      status: signedUpFor,
      phoneNumber: authUser.phoneNumber,
      internships: 0,
      imageURL: authUser.photoURL,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      sex: "",
      course: ""
    });
  }
};


