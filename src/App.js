import "./App.css";
import BasicModal from "./components/modal";
import useAppContext from "./context/useAppContext";
import Router from "./router/router";

function App() {
  const {modalTitle, modalMessage, openModal, setOpenModal} = useAppContext();
  return (
    <>
      <Router />
      <BasicModal 
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        openModal={openModal}
        setOpenModal= {setOpenModal}
        modalAction={() => setOpenModal(false)} />
    </>
  );
}

export default App;
