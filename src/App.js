import React, {useEffect, useState} from 'react';
import CustomTable from "./components/customTable";
import connectionService from "./services/connectionService";

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
    }
];

const limitCount = 50;
let limits = {offset: 0, limit: limitCount};

function App() {
    const [tableData, updateData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(false);
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

  return (
      <React.Fragment>
          <CustomTable
              onScroll={onScroll}
              // onFilter={onFilter(mode)}
              headers={headers}
              data={tableData}
              totalData={totalData}
              isLoading={loading}
              onItemClick={() => {}}
              onRemoveItems={() => {}}
          />
      </React.Fragment>
  );
}

export default App;
