const handleEdit = ({items, setItems ,setConfig, id}) => {
    
    const updatedItems = items.map((item) =>
        item.id === id ? { ...item, isEdited: true } : {...item, isEdited:false}
    );
    var item = null;
    
    items.map((item_) => {
        if(item_.id === id){
            item = item_
        }
    })

    setItems(updatedItems);
    setConfig(item);

};

export default handleEdit;