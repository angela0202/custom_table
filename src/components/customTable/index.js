import React, {useRef, useState, useEffect} from "react";
import Scrollbar from "../scrollbar";
import PropTypes from "prop-types";
import useLazyLoad from "../../hooks/useLazyLoad";
import {isEqual} from "../../helpers/helpetFunctions";
import '../../assets/styles/customTable.scss';

const CustomTable = (props) => {
    const {onScroll, headers, data, totalData, isLoading, onFilter, onItemClick, action, onRemoveItems} = props;
    const [sortActiveIndex, setSortActiveIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [initialData, setInitialData] = useState(data);
    const scrollRef = useRef(null);

    useLazyLoad(scrollRef, totalData, isLoading, data.length, onScroll, sortOrder);

    const sortData = (index) => {
        data.sort((a, b) => b[index].toLowerCase() - a[index].toLowerCase() > 0
            ? 1 : b[index].toLowerCase() - a[index].toLowerCase() < 0 ? -1 : 0).reverse();
    };

    const handleDefaultSorting = (index, mode) => {
        setSortActiveIndex(index);
        sortData(index);
        switch (mode) {
            case 'desc': {
                return setSortOrder('asc');
            }
            case 'asc':
            default: {
                return setSortOrder('desc');
            }
        }
    };

    const onSortClick = (data) => () => {
        const {dataIndex: index} = data;
        if (onFilter) {
            // pass data to caller function and toggle sort status using callback function
            onFilter(data, (mode) => {
                setSortOrder(mode);
                setSortActiveIndex(index);
            });
        } else {
            handleDefaultSorting(index, sortOrder)
        }
    };

    useEffect(() => {
        if (data && !initialData.length) {
            setInitialData(data);
            return;
        }
        if (initialData.length !== data.length && !isEqual(initialData, data)) {
            setSortOrder(null);
            setSortActiveIndex(null);
            setInitialData(data);
        }
    }, [initialData, data, sortActiveIndex]);

    const removeAction = (data) => (e) => {
        e.stopPropagation();
        onRemoveItems(data);
    };

    return (
        <Scrollbar ref={scrollRef}>
            <div className="table-data">
                <div className="row head">
                    {headers.map((val, index) => (
                        <div key={index} className="col">
                            <span>{val.title}</span>
                            {val.sorter && <i
                                className={`fas ${sortActiveIndex === val.dataIndex ? 'active' : ''} fa-sort-${sortOrder ? sortOrder === 'asc' ? 'up' : 'down' : 'up'}`}
                                onClick={onSortClick(val)}/>}
                        </div>
                    ))}
                    <div className="col">
                        {action && "Actions"}
                    </div>
                </div>
                {
                    data.map((val, index) => {
                        const dataKeys = headers.map(val => val.dataIndex);
                        return (
                            <div className="row" key={index} onClick={() => onItemClick(val)}>
                                {dataKeys.map((key, index) => <div key={index} className="col">{val[key]}</div>)}
                                <div className="col" onClick={removeAction(val)}>{action}</div>
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
    onFilter: PropTypes.func,
    onItemClick: PropTypes.func,
    onRemoveItems: PropTypes.func,
    headers: PropTypes.array,
    data: PropTypes.array,
    totalData: PropTypes.number,
    isLoading: PropTypes.bool,
    action: PropTypes.node
};

CustomTable.defaultProps = {
    onScroll: () => {},
    onItemClick: () => {},
    data: []
};

export default CustomTable;