import React, {Dispatch, SetStateAction} from 'react';
import modal_window_styles from '@/app/styles/modules/window.module.scss';

type ModalWindowPropTypes = {
    modalActive: boolean,
    setModalActive: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}
const ModalWindow = ({children, modalActive, setModalActive}: ModalWindowPropTypes) => {
    const handleOnClickCloseWindow = () => {
        setModalActive(false);
    }

    return (
        <>
            <div className={modalActive ?
                modal_window_styles.modal_window_active :
                modal_window_styles.modal_window_off}
                 onClick={handleOnClickCloseWindow}>
                <div className={modalActive ?
                    modal_window_styles.modal_content_active :
                    modal_window_styles.modal_content_active}
                     onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>

        </>
    );
};

export default ModalWindow;