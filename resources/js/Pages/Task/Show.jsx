
import { useEffect, useRef, useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP
} from "@/constant.js";
import { Link } from '@inertiajs/react';
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import { FaAngleDoubleRight } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Show({ taskData, onClose }) {

    const [width, setWidth] = useState(50);
    const [isAtMinWidth, setIsAtMinWidth] = useState(false);
    const panelRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(0);


    const handleMouseDown = (e) => {
        if (e.target.classList.contains('drag-handle')) {
            e.preventDefault();
            isDragging.current = true;
            document.body.style.cursor = 'ew-resize';
            startX.current = e.clientX;
            startWidth.current = panelRef.current.offsetWidth;
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current || !panelRef.current) return;

        e.preventDefault();
        const panel = panelRef.current;
        const parentWidth = panel.parentElement.offsetWidth;
        const dx = e.clientX - startX.current;
        const newWidthPx = startWidth.current - dx;
        const newWidthPercent = (newWidthPx / parentWidth) * 100;
        const maxWidthPercent = 100;
        const minWidthPx = 360;


        setIsAtMinWidth(newWidthPx <= minWidthPx);

        if (newWidthPercent <= 25) {
            isDragging.current = false;
            document.body.style.cursor = 'default';
            if (onClose) onClose();
        } else if (newWidthPercent <= maxWidthPercent) {
            setWidth(newWidthPercent);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = 'default';
        setIsAtMinWidth(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [onClose]);

    return (
        <div
            ref={panelRef}
            className={`bg-white h-full p-6 pl-10 border top-0 right-0 overflow-auto absolute select-none min-w-90 transition-colors duration-300 rounded-lg ${
                isAtMinWidth ? 'border-red-500 bg-red-50' : 'border-gray-300 '
            }`}
            style={{
                width: `${width}%`,
                transition: 'width 0.1s ease',
            }}
        >
            <div
                className={`drag-handle absolute left-0 top-0 bottom-0 w-8 cursor-ew-resize ${isAtMinWidth ? 'border-l-8 border-red-500' : 'border-l-8' }`}
                onMouseDown={handleMouseDown}
            />
            {isAtMinWidth ? (
                <div className="flex items-center justify-center h-full text-red-500 animate-pulse">
                    <FaAngleDoubleRight className="w-6 h-6 mr-2" />
                    <h1 className="text-lg font-bold">Drag to the right to close</h1>
                </div>
            ) : (
                <div>
                    <div>
                        <div className="flex gap-2 items-center justify-end mb-5">
                            <Link className="flex items-center gap-1 text-white bg-gray-800 py-1 px-3 font-bold  rounded-lg">
                                <MdEdit className="w-4 h-4  hover:cursor-pointer"/>
                                Edit
                            </Link>
                            <Link className="flex items-center gap-1 text-white bg-red-600 py-1 px-3 font-bold rounded-lg">
                                <AiFillDelete className="w-4 h-4 hover:cursor-pointer"/>
                                Delete
                            </Link>
                        </div>
                        <div className="w-full h-[20dvh] overflow-hidden rounded-lg border mb-5">
                            <img src={taskData?.image_path} alt={`image-${taskData?.name}`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">{taskData?.name}</h1>
                    <hr className="my-5" />
                    <div className="grid grid-cols-2 w-fit gap-x-24 sm:gap-y-2 mb-5">
                        <div className="flex items-center gap-3">
                            <GoClock className="w-4 h-4 opacity-60" />
                            <h1 className="text-gray-500 sm:text-lg">Priority: </h1>
                        </div>
                        <h2 className={`px-3 text-xs sm:text-sm py-1 w-fit text-white rounded ${TASK_PRIORITY_CLASS_MAP[taskData?.priority]} opacity-40`}>
                            {TASK_PRIORITY_TEXT_MAP[taskData?.priority]}
                        </h2>
                        <div className="flex items-center gap-3">
                            <HiOutlineStatusOnline className="w-4 h-4 opacity-60" />
                            <h1 className="text-gray-500 sm:text-lg">Status: </h1>
                        </div>
                        <h2 className={`px-3 text-xs sm:text-sm py-1 w-fit text-white rounded ${PROJECT_STATUS_CLASS_MAP[taskData?.status]}`}>
                            {PROJECT_STATUS_TEXT_MAP[taskData?.status]}
                        </h2>
                        <div className="flex items-center gap-3">
                            <SlCalender className="w-4 h-4 opacity-60" />
                            <h1 className="text-gray-500 sm:text-lg">Due date: </h1>
                        </div>
                        <h2 className="sm:text-lg">{taskData?.due_date}</h2>
                        <div className="flex items-center gap-3">
                            <GoClock className="w-4 h-4 opacity-60" />
                            <h1 className="text-gray-500 sm:text-lg">Time: </h1>
                        </div>
                        <h2 className="sm:text-lg">{taskData?.clock_due_date}</h2>

                    </div>
                    <div>
                        <h1 className="text-gray-500 sm:text-lg">Description: </h1>
                        <p>
                            {taskData?.description}
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, provident, veritatis. A accusamus alias aliquid consectetur doloremque, ducimus ea fuga illum impedit incidunt inventore iste, magnam natus nisi nulla optio quam quo quod reprehenderit similique sint voluptate voluptatem. Autem eaque nam necessitatibus numquam repellat.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-gray-500 sm:text-lg mt-10">Created at: </h1>
                        <p>
                            {taskData?.created_at}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
