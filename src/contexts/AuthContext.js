// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signOut,
//   updatePassword,
//   updateProfile,
// } from "firebase/auth";
// import jwt_decode from "jwt-decode";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUserInfo } from "../app/features/authSlice";
// import CustomBackdrop from "../components/controls/CustomBackdrop";
// import { auth } from "../firebase/Firebase.config";

// // React Context
// const AuthContext = createContext();
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // Provider
// const AuthProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState({});
//   const [loading, setLoading] = useState(true);

//   // redux element
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const subscribed = onAuthStateChanged(auth, async (user) => {
//       setUserInfo(user);
//       if (user) {
//         const token = await user?.getIdToken();
//         let users = jwt_decode(token);
//         dispatch(addUserInfo({ users, token }));
//       }
//       setLoading(false);
//     });

//     return () => subscribed;
//   }, [dispatch]);

//   //   Signup User
//   const signup = async (email, password, name) => {
//     await createUserWithEmailAndPassword(auth, email, password);

//     // update user name
//     await updateProfile(auth.currentUser, {
//       displayName: name,
//     });

//     setUserInfo({ ...auth.currentUser });
//   };

//   //   Login User
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   //   Logout User
//   const logout = () => {
//     dispatch(addUserInfo({ users: "", token: "" }));
//     return signOut(auth);
//   };

//   const forgetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   const userUpdatePassword = (newPassword) => {
//     const user = auth.currentUser;

//     return updatePassword(user, newPassword);
//   };

//   const value = {
//     userInfo,
//     signup,
//     login,
//     logout,
//     loading,
//     forgetPassword,
//     userUpdatePassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {loading ? <CustomBackdrop open={true} /> : children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
