import './App.css';
import AppRouter from "./router/AppRouter.tsx";

// import MainLayout from "./layouts/MainLayout.tsx";
import AppToast from "./components/AppToast.tsx";

function App() {
  return (
      // <>
      //     <MainLayout>
      //         <AppRouter />
      //     </MainLayout>
      //     <AppToast />
      // </>
      <>
          <AppRouter/>
          <AppToast/>
      </>
  );
}
export default App;
