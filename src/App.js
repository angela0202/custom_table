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
let limits = {offset: 0, limit: limitCount, order_by: 'name'};

function App() {
    const [tableData, updateData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        connectionService.getCountries({...limits})
            .then(val => {
                setTotalData(val.total);
                updateData(val.data);
                setLoading(false);
            });
    }, []);

    const onScroll = () => {
        setLoading(true);
        limits = {offset: limits.offset + limits.limit, limit: limitCount, order_by: 'name'};
        connectionService.getCountries({...limits})
            .then(val => {
                setTotalData(val.total);
                updateData([...tableData, ...val.data]);
                setLoading(false);
            });
    };

  return (
      <React.Fragment>
          <CustomTable
              onScroll={onScroll}
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
