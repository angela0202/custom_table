import React, {useEffect, useState} from 'react';
import CustomTable from "./components/customTable";
import connectionService from "./services/connectionService";
import Modal from "./components/modal";

const headers = [
    {
        dataIndex: 'iso3_code',
        title: 'Iso3 code',
        width: 120,
        sorter: true,
    },
    {
        dataIndex: 'name',
        title: 'Name',
        width: 120,
        sorter: false,
    },
    {
        dataIndex: 'region_name',
        title: 'Region',
        width: 120,
        sorter: false,
    }
];

const limitCount = 50;
let limits = {offset: 0, limit: limitCount};

function App() {
    const [tableData, updateData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    // const [mode, toggleMode] = useState('desc');

    useEffect(() => {
        setLoading(true);
        connectionService.getCountries({...limits})
            .then(val => {
                setTotalData(val.total);
                updateData(val.data);
                setLoading(false);
            });
    }, []);

    const onScroll = (orderDirection) => {
        setLoading(true);
        limits = {offset: limits.offset + limits.limit, limit: limitCount};
        connectionService.getCountries({...limits, ...(orderDirection ? {order_direction: orderDirection} : {})})
            .then(val => {
                setTotalData(val.total);
                updateData([...tableData, ...val.data]);
                setLoading(false);
            });
    };

    // // example of controlled sorting
    // const onFilter = (mode) => (data, toggleSortStatus) => {
    //     const index = data.dataIndex;
    //     const tData = JSON.parse(JSON.stringify(tableData));
    //     tData.sort((a, b) => b[index].toLowerCase() - a[index].toLowerCase() > 0 ? 1 : b[index].toLowerCase() - a[index].toLowerCase() < 0 ? -1 : 0).reverse()
    //     toggleSortStatus(mode);
    //     toggleMode(mode === "asc" ? "desc" : "asc");
    //     updateData(tData);
    // };

    const onRemoveItems = (data) => {
        updateData(tableData.filter(val => val["iso3_code"] !== data["iso3_code"]))
    };

    return (
        <React.Fragment>
            <CustomTable
                onScroll={onScroll}
                // onFilter={onFilter(mode)}
                onItemClick={setSelectedData}
                headers={headers}
                data={tableData}
                totalData={totalData}
                isLoading={loading}
                onRemoveItems={onRemoveItems}
                action={<i className="fas fa-trash" />}
            />
            {selectedData && <Modal title="Detailed info" closeCallBack={() => setSelectedData(null)}>
                  <div>
                      <div className="row">
                          <div className="col">Country code</div>
                          <div className="col">{selectedData["iso3_code"]}</div>
                      </div>
                      <div className="row">
                          <div className="col">Country name</div>
                          <div className="col">{selectedData.name}</div>
                      </div>
                      <div className="row">
                          <div className="col">Region name</div>
                          <div className="col">{selectedData["region_name"]}</div>
                      </div>
                      <div className="row">
                          <div className="col">SubRegion name</div>
                          <div className="col">{selectedData["sub_region_name"]}</div>
                      </div>
                  </div>
            </Modal>}
        </React.Fragment>
  );
}

export default App;
