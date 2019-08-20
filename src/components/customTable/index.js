import React, {useRef} from "react";
import '../../assets/styles/customTable.scss';
import Scrollbar from "../scrollbar";

const CustomTable = () => {
    const scrollRef = useRef(null);

    return (
        <Scrollbar ref={scrollRef}>
            <div className="table-data">
                <div className="row head">
                    <div className="col">Name</div>
                    <div className="col">User</div>
                </div>
                {
                    Array(50).fill({name: 'aaaa afdfads adf', data: 'bbb'}).map((val) => {
                        return (
                            <div className="row">
                                <div className="col">{val.name}</div>
                                <div className="col">{val.data}</div>
                            </div>
                        );
                    })
                }
            </div>
        </Scrollbar>
    )
};

export default CustomTable;