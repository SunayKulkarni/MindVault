
export const SideBar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-2xl font-bold mb-6">MindVault</h2>
            <ul>
                <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li>
                <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Profile</li>
                <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
                <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Logout</li>
            </ul>
        </div>
    );
}