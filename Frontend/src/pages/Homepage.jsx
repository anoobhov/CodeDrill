import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axiosClient from "../utils/axiosClient"
import { logoutUser } from "../authSlice"
import { NavLink } from 'react-router';
import AnimateBg from "../components/bg_animation";
import { ThumbsUp,ArrowUpDown,ArrowUp, ArrowDown } from "lucide-react";


function Homepage(){

    return(<><AnimateBg/></>)
}

export default Homepage