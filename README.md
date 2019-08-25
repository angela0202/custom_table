##Description
* Table Component with infinite scroll and lazy loading
* Table columns can be sorted in asc or desc mode
* Table rows shows detailed information on click
* Table rows can be selected and deleted

##Props

Name | Type
------------ | -------------
onScroll | function
onFilter | function
onItemClick | function
onRemoveItems | function
headers | array
data | array
totalData | number
isLoading | boolean

```$xslt
<CustomTable
    onScroll={onScroll}
    onFilter={onFilter(mode)}
    onItemClick={setSelectedData}
    headers={headers}
    data={tableData}
    totalData={totalData}
    isLoading={loading}
    onRemoveItems={onRemoveItems}
/>
```