import React from 'react'
import API from '../constants'
import ProductItem from './ProductItem'


class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
        };
    }

    fetchData() {
        let url = `${API.products}`;
        fetch(url).then((res) => res.json()).then((data) => {
            this.setState({
                products: data
            });
        }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let products = this.state.products.map((elem) => (
            <div key={elem.id} className='column is-quarter'><ProductItem item={elem} /></div>)
        )
        return (
            <div className='columns is-multiline'>{products}</div>
        )
    }
}

module.exports = ProductList;