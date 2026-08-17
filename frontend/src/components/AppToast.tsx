import { ToastContainer } from "react-toastify";

function AppToast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
        />
    );
}

export default AppToast;