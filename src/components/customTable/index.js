import React, {useRef} from "react";
import '../../assets/styles/customTable.scss';
import Scrollbar from "../scrollbar";
import PropTypes from "prop-types";
import useLazyLoad from "../../hooks/useLazyLoad";

const CustomTable = (props) => {
    const {onScroll, headers, data, totalData, isLoading} = props;
    const scrollRef = useRef(null);

    useLazyLoad(scrollRef, totalData, isLoading, data.length, onScroll);

    return (
        <Scrollbar ref={scrollRef}>
            <div className="table-data">
                <div className="row head">
                    {headers.map((val, index) => <div key={index} className="col">{val.title}</div>)}
                </div>
                {
                    data.map((val, index) => {
                        const dataKeys = headers.map(val => val.dataIndex);
                        return (
                            <div className="row" key={index}>
                                {dataKeys.map((key, index) => <div key={index} className="col">{val[key]}</div>)}
                            </div>
                        )
                    })
                }
            </div>
        </Scrollbar>
    )
};

CustomTable.propTypes = {
    onScroll: PropTypes.func,
    headers: PropTypes.array,
    data: PropTypes.array,
    totalData: PropTypes.number,
    isLoading: PropTypes.bool
};

CustomTable.defaultProps = {
    onScroll: () => {},
    data: []
};

export default CustomTable;