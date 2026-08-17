import {Routes, Route} from "react-router-dom";

import Duties from "../pages/duties/Duties";
import UploadExcel from "../pages/uploadExcel/UploadExcel.tsx";
import Employees from "../pages/employees/Employees.tsx";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import AuditLogs from "../pages/auditLogs/AuditLogs.tsx";
import Notifications from "../pages/notifications/Notifications.tsx";
import Users from "../pages/users/Users.tsx";

export default function AppRouter() {

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employees"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Employees/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/duties"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Duties/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload"
                element={
                    <ProtectedRoute permission="uploadSchedule">
                        <MainLayout>
                            <UploadExcel/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute permission="sendNotifications">
                        <MainLayout>
                            <Notifications/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <ProtectedRoute permission="manageUsers">
                        <MainLayout>
                            <Users/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/audit-logs"
                element={
                    <ProtectedRoute permission="viewAuditLogs">
                        <MainLayout>
                            <AuditLogs/>
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>


    );
}