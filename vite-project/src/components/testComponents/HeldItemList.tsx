import './HeldItemList.css'
import React, { useEffect, useState} from 'react'

interface HeldItem {
    name: string
    url: string
}

const HeldItemList : React.FC = () => {
    
    const [heldItems, setItems] = useState<HeldItem[]>([]);
    const [searchedItem, setSearchedItem] = useState<string>('');
    const [showAllItems, setShowAllItems] = useState<boolean>(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try{
            const response1 = await fetch(`https://pokeapi.co/api/v2/item-attribute/holdable`);
            const response2 = await fetch(`https://pokeapi.co/api/v2/item-attribute/holdable-active/`)
            if (!response1.ok || !response2)
                {
                    throw new Error('Item list not found!')
                }
            const itemData1 = await response1.json();
            const itemData2 = await response2.json();
            const helditemsList1 = itemData1.items.map((item : {name : string; url : string}) => ({
                name: item.name,
                url: item.url
            }))
            const helditemsList2 = itemData2.items.map((item : {name : string; url : string}) => ({
                name: item.name,
                url: item.url
            }))
            const allItems = [...helditemsList1, ...helditemsList2]
            const uniquieItems = allItems.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.name === item.name
                ))
            )
            setItems(uniquieItems);
        }
        catch(error)
        {
            console.log("Error fetching items:", error);
        }
    }

    const handleItemSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchedItem(e.target.value)
    }
    const filterSearchedItems = heldItems.filter(item =>
        item.name.toLowerCase().includes(searchedItem.toLowerCase())
    )
    const handleShowAllItems = () => {
        setShowAllItems(true);
    }
    const handleCloseModal = () => {
        setShowAllItems(false);
    }

    return (
        <div>
            <h3>Item Search</h3>
            <input type="text" placeholder='Search for holdable item...' value={searchedItem} onChange={handleItemSearch}/>
            {searchedItem && (
                <ul>
                    {filterSearchedItems.map((item, index) => (
                        <li key={index}>
                            <button>{item.name}</button>
                        </li>
                    ))}
                </ul>
            )}
            {!searchedItem && (
                <div>
                    <button onClick={handleShowAllItems}>Show All Items</button>
                </div>  
            )}
            {showAllItems && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>All Items</h2>
                        <ul>
                            {heldItems.map((item, index) =>
                                <li key={index}>{item.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeldItemList;