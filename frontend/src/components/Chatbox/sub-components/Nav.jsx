import React, { useEffect, useState } from "react";
import Heading from "../../Heading/Heading.jsx";
import { getUserApi } from "../../../API/user.request.js";
import { useSelector } from "react-redux";

const Nav = () => {
    const receiverId = useSelector((state) => state.conversation.receiverId);

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getUserApi(receiverId);
                if (result.status === 200) {
                    setUser(result.data.user);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (receiverId) getUser();

        return () => setUser({});
    }, [receiverId]);

    return (
        <div className="flex items-center">
            <span className="font-bold text-2xl text-orange-500 mr-[1px]">
                To :
            </span>
            <p className="ml-2 text-xl">{user?.name}</p>
        </div>
    );
};

export default Nav;
