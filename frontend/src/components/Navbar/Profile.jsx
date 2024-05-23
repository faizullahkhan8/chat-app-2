import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { resetUser } from "../../redux-store/Slices/user.slice.js";
import { resetConversation } from "../../redux-store/Slices/conversation.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { LogoutApi } from "../../API/auth.request.js";
import { toast } from "react-toastify";

const Profile = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [isProfileShow, setIsProfileShow] = useState(false);

    const handleLogout = async () => {
        try {
            const result = await LogoutApi();

            if (result.status === 200) {
                dispatch(resetUser());
                dispatch(resetConversation());
                toast.success("Logout succesfully");
            }
        } catch (error) {
            console.log("[ERROR IN LOGOUT]", error.message);
        }
    };

    return (
        <>
            <div
                className="flex items-center justify-center text-xl text-white font-bold w-12 h-12 text-center rounded-full bg-orange-400 cursor-pointer"
                onClick={() => setIsProfileShow((prev) => !prev)}
            >
                {user.username[0]?.toUpperCase()}
            </div>
            {isProfileShow && (
                <div
                    className="flex justify-center flex-col gap-2 absolute top-12 right-3 w-[260px] h-auto px-4 py-2 border border-orange-500 rounded-md"
                    style={{ background: "rgb(248, 243, 230)" }}
                >
                    <div className="relative">
                        <div
                            className="w-5 h-5
                     absolute right-0 top-0 text-white p-3 flex items-center justify-center rounded-full bg-red-500 cursor-pointer hover:bg-transparent hover:text-red-500 border border-red-500"
                            onClick={() => setIsProfileShow(false)}
                        >
                            x
                        </div>
                    </div>
                    <h1 className="">Name:{` ${user.name}`}</h1>
                    <h1 className="">
                        Username:{" "}
                        <span className="text-orange-500 text-xl">@</span>
                        {` ${user.username}`}
                    </h1>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
        </>
    );
};

export default Profile;
