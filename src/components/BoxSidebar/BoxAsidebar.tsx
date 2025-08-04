import type React from "react";
import { Link } from "react-router";

interface Props {
    title: string,
    url: string
    pathIcon: string
}

const BoxAsidebar: React.FC<Props> = ({ title, url,pathIcon }:Props) => {
    return (
        <li>
            <Link to={url} className="flex items-center p-3 text-white rounded-full dark:text-white hover:bg-[#4185D4] dark:hover:bg-[#4185D4] group">
                <svg width="15" height="15" viewBox="0 0 15 15"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={pathIcon}
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                    </path>
                </svg>
                <span className="ms-3">{title}</span>
            </Link>
        </li>
    )
}

export default BoxAsidebar;