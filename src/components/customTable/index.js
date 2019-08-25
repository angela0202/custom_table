import React, {useRef, useState, useEffect} from "react";
import Scrollbar from "../scrollbar";
import PropTypes from "prop-types";
import useLazyLoad from "../../hooks/useLazyLoad";
import {isEqual} from "../../helpers/helpetFunctions";
import '../../assets/styles/customTable.scss';

const Checkbox = ({checked=false, handleChange, value}) => {
  return (
      <div className="checkbox">
          <label onClick={(e) => e.stopPropagation()}>
              <input
                  type="checkbox"
                  className="checkbox-input"
                  value={value}
                  checked={checked}
                  onChange={handleChange}
              />
              <span />
          </label>
      </div>
  )
};

const CustomTable = (props) => {
    const {onScroll, headers, data, totalData, isLoading, onFilter, onItemClick, onRemoveItems} = props;
    const [sortActiveIndex, setSortActiveIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [initialData, setInitialData] = useState(data);
    const scrollRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [allSelected, setAllSelected] = useState(false);

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

    const handleSelection = (e) => {
        if (e.target.value === "all") {
            setAllSelected(true);
            setSelectedItems(Object.keys(selectedItems).reduce((acc, curr) => ({...acc, [curr]: true}), {}));
            return;
        }

        setSelectedItems({...selectedItems, [e.target.value]: e.target.checked})
    };

    return (
        <Scrollbar ref={scrollRef}>
            <div className="table-data">
                <div className="row head">
                    {headers.map((val, index) => (
                        <div key={index} className="col" style={{width: `${val.width}px`}}>
                            <span>{val.title}</span>
                            {val.sorter && <i
                                className={`fas ${sortActiveIndex === val.dataIndex ? 'active' : ''} fa-sort-${sortOrder ? sortOrder === 'asc' ? 'up' : 'down' : 'up'}`}
                                onClick={onSortClick(val)}/>}
                        </div>
                    ))}
                    <div className="col" style={{width: `120px`}}>
                        {<React.Fragment>
                            <span>Select All</span>
                            <Checkbox checked={allSelected} value="all" handleChange={handleSelection}/>
                            {allSelected && <i className="fas fa-trash" onClick={removeAction(data)} />}
                        </React.Fragment>}
                    </div>
                </div>
                {
                    data.map((val, index) => {
                        const isChecked = selectedItems.hasOwnProperty(val["iso3_code"]) ? selectedItems[val["iso3_code"]] : allSelected;
                        return (
                            <div className="row" key={index} onClick={() => onItemClick(val)}>
                                {headers.map((head, index) => <div key={index} className="col" style={{width: `${head.width}px`}}>{val[head.dataIndex]}</div>)}
                                <div className="col" style={{width: `120px`}}>
                                    <Checkbox checked={isChecked} value={val["iso3_code"]} handleChange={handleSelection}/>
                                    {isChecked && <i className="fas fa-trash" onClick={removeAction(val)}/>}
                                </div>
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
    isLoading: PropTypes.bool
};

CustomTable.defaultProps = {
    onScroll: () => {},
    onItemClick: () => {},
    data: []
};

export default CustomTable;