import React, {forwardRef} from "react";
import '../../assets/styles/scroll.scss';

const Scrollbar = forwardRef((props, ref) => {
    const {children} = props;
    return (
        <div className="cj-scroller">
            <div className="cj-scroll" ref={ref}>
                {children}
            </div>
        </div>
    );
});


export default Scrollbar;
