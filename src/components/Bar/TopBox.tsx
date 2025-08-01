

interface TopBarProps {
    pageName?: string,
    busCentralName: string
}
function TopBar({ pageName, busCentralName }: TopBarProps) {
    return (

        <div className="w-full px-3 py-3 lg:px-8 lg:pl-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[#023672]">{pageName} - {busCentralName}</span>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center ms-3">
                        <div>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" alt="user photo" src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;