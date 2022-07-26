import './MenuItems.css';
import {NavLink} from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function MenuItems() {

    const [items, setItems] = useState([])

    useEffect(() => {
        const categoriesCollection = collection(db,'categories');
        getDocs(categoriesCollection)
        .then(result => {
            const list = result.docs.map(categorie => {
                return {
                    id: categorie.id,
                    ...categorie.data()
                }
            })
            setItems(list.sort(sortArray));
        })
        .catch(err => console.log(err))
    },[])

    const sortArray = (x,y) => {
        if (x.description < y.description) return -1;
        if (x.description > y.description) return 1;
        return 0;
    }    

    return (
        <nav className="menuItems">
            <NavLink to="/" key={0}>Home</NavLink>
            {items.map((item) => (
                <NavLink to={`/categoria/${item.key}`} key={item.id}>{item.description}</NavLink>
            ))}
        </nav>
    )
}

