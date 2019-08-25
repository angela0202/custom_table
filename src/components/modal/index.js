import React from 'react';
import {createPortal} from 'react-dom';
import Scrollbar from "../scrollbar";
import '../../assets/styles/modal.scss';

export const Modal = (props) => {
    const {children, title, closeCallBack} = props;
    const rootEl = document.body;
    return createPortal(
        <div className="modal-holder">
            <div className="modal">
                <div className="modal-header">
                    <h1>{title}</h1>
                    <button className="icon-close" onClick={closeCallBack} />
                </div>
                <div className="modal-body">
                    <Scrollbar>
                        {children}
                    </Scrollbar>
                </div>
            </div>
        </div>,
        rootEl
    );
};

export default Modal;
