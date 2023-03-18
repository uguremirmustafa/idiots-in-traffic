import { useModal } from 'store';

function Modal() {
  const { modal, setModal } = useModal();

  const isOpen = !!modal;
  const toggle = () => {
    setModal(null);
  };

  return (
    <div
      className={`flex items-center justify-center w-screen h-screen bg-black ${
        isOpen ? 'fixed bg-opacity-50 z-10' : 'hidden bg-opacity-0 -z-10'
      }`}
    >
      <div className="z-20 w-1/2 h-1/4 rounded bg-white shadow-lg">
        <div className="w-100 border-b px-4 h-12 flex items-center relative">
          {modal?.title}
          <button
            onClick={toggle}
            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded leading-none"
          >
            &#x2715;
          </button>
        </div>
        <div className="p-4">{modal?.content}</div>
      </div>
    </div>
  );
}

export default Modal;
