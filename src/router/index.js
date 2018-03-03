import Login from "../screens/Login";
import {DrawerNavigator} from "react-navigation";
import RouteStack from "./stack";

const DrawerNav = DrawerNavigator(
    {
        Stack: {
            screen: RouteStack
        },
        Login: {
            screen: Login
        }
    }
);

export default DrawerNav;
